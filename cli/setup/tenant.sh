toSlug() {
  # Forcing the POSIX local so alnum is only 0-9A-Za-z
  export LANG=POSIX
  export LC_ALL=POSIX
  # Keep only alphanumeric value
  sed -e 's/[^[:alnum:]]/-/g' |
  # Keep only one dash if there is multiple one consecutively
  tr -s '-'                   |
  # Lowercase everything
  tr A-Z a-z                  |
  # Remove last dash if there is nothing after
  sed -e 's/-$//'
}

colorPrint() {
  echo "\033[0;36m$1\033[0m"
}

gitURL=https://github.com/Mawla/growth-websites
scope=mawla-team

colorPrint "What's the name of the project?"
read -p "name:" name
colorPrint "Okay, slugified naming for Vercel"
projectName=$(echo "$name" | toSlug $name)
echo $projectName

touch ".env.development.local"

mkdir "$projectName"
git clone "$gitURL" "$projectName"
cd "./$projectName"
rm -rf .git

# get sanity auth token
authToken=$(sanity debug --secrets | grep 'Auth token' | cut -d \' -f2)

# generate new sanity project
colorPrint "- Creating new Sanity project"

result=$(curl --silent POST 'https://api.sanity.io/v2021-06-07/projects' \
-H "Authorization: Bearer $authToken" \
-H 'Content-Type:application/json' \
-d "{
    \"displayName\": \"$name\",
    \"organizationId\": \"off6YjRVq\"
}")

echo $result

sanityProjectId=$(echo $result 2>&1 | npx --yes groq-cli '(*).id' | xargs)

colorPrint "- Created sanity project with id '$sanityProjectId'"

# Write project id to .env.development.local
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=$sanityProjectId" >> ".env.development.local"
echo "SANITY_STUDIO_API_PROJECT_ID=$sanityProjectId" >> ".env.development.local"

# Generate dataset
colorPrint "- Generating new Sanity dataset 'production'"
sanity dataset create production --visibility public

echo "NEXT_PUBLIC_SANITY_DATASET=production" >> ".env.development.local"
echo "SANITY_STUDIO_API_DATASET=production" >> ".env.development.local"

# Generate preview secret
colorPrint "- Generating preview secret"
previewSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+' '+*[1]+' '+*[2]+' '+*[3]" | xargs)
echo "SANITY_PREVIEW_SECRET=$previewSecret" >> ".env.development.local"

colorPrint "- Generating webhook secret"
webhookSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+''+*[1]+''+*[2]+''+*[3]" | xargs)
echo "SANITY_WEBHOOK_SECRET=$webhookSecret" >> ".env.development.local"

# Generate rest .env.development.local
colorPrint "- Writing project path"
echo "SANITY_STUDIO_PROJECT_PATH=/" >> ".env.development.local"

colorPrint "- Generating read api key"
writeJson=$(curl POST "https://api.sanity.io/v2021-06-07/projects/$sanityProjectId/tokens" -H "Authorization: Bearer $authToken" -H "Content-Type: application/json" --data-raw '{"label":"preview-write","roleName":"editor"}')
sanityWriteToken=$(echo $writeJson | npx --yes groq-cli '(*).key' | xargs)
echo "SANITY_API_WRITE_TOKEN=$sanityWriteToken" >> ".env.development.local"

colorPrint "- Generating write api key"
readJson=$(curl POST "https://api.sanity.io/v2021-06-07/projects/$sanityProjectId/tokens" -H "Authorization: Bearer $authToken" -H "Content-Type: application/json" --data-raw '{"label":"preview-read","roleName":"viewer"}')
sanityReadToken=$(echo $readJson | npx --yes groq-cli '(*).key' | xargs)
echo "SANITY_API_READ_TOKEN=$sanityReadToken" >> ".env.development.local"

# Write sanity api tokens
echo "" >> ".env.development.local"

# Add CORS origins
colorPrint "- Add localhost CORS origin to Sanity"
sanity cors add http://localhost:3000 --credentials
sanity cors add http://localhost:3333 --credentials
sanity cors add http://localhost:6006 --credentials

sanity cors add "https://$projectName.vercel.app" --credentials

# init vercel
colorPrint "- Initializing vercel"
vercel project add "$projectName" -S "$scope"
vercel link -S "$scope" --yes
vercel git connect "$gitURL" -S "$scope" --yes

colorPrint "- Adding Vercel Vars"
while IFS= read -r line
do
  if [ -n "$line" ]; then
    key=$(echo "$line" | cut -d "=" -f 1)
    value=$(echo "$line" | cut -d "=" -f 2)
  fi
  echo $value | tr -d '\n' | vercel env add $key production
done < "./.env.development.local"

colorPrint "- Deploying to Vercel"
vercel --prod --no-wait

colorPrint "- Inviting Sanity users"

# sanity users invite dan@mawla.ie --role administrator
# sanity users invite arjen@mawla.ie --role administrator
# sanity users invite ben@mawla.ie --role administrator


# Remove tmp directory
rm -rf "../$projectName"

colorPrint "Done!"

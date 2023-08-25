colorPrint() {
  echo "\033[0;36m$1\033[0m"
}
addVercelEnvVar() {
  echo $1 | tr -d '\n' | vercel env add $2 production --cwd "$projectName"
}

vercelToken=GlLw4VtYX4LrGkptwirwVvXu
gitURL=https://github.com/Mawla/growth-websites
scope=mawla-team
#TEAM_ID=team_A6BdRNwaMCRkxWfwew0CF4Dq

colorPrint "What's the name of the project?"

read projectName

rm -rf .env.development.local
touch ".env.development.local"

#Vercel CLI reads the directory name to decide what to link to, creating shallow clone of the repos .git folder
mkdir "$projectName"
cp -R .git "$projectName"

# get sanity auth token
authToken=$(sanity debug --secrets | grep 'Auth token' | cut -d \' -f2)

# generate new sanity project
colorPrint "- Creating new Sanity project"

result=$(curl --silent POST 'https://api.sanity.io/v2021-06-07/projects' \
-H "Authorization: Bearer $authToken" \
-H 'Content-Type:application/json' \
-d "{
    \"displayName\": \"$projectName\",
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
colorPrint "- Generating new Sanity dataset 'development'"
sanity dataset create development --visibility public

echo "NEXT_PUBLIC_SANITY_DATASET=production" >> ".env.development.local"
echo "SANITY_STUDIO_API_DATASET=production" >> ".env.development.local"

# Generate preview secret
colorPrint "- Generating preview secret"
previewSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+' '+*[1]+' '+*[2]+' '+*[3]" | xargs)
echo "SANITY_PREVIEW_SECRET=\"$previewSecret\"" >> ".env.development.local"

colorPrint "- Generating webhook secret"
webhookSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+''+*[1]+''+*[2]+''+*[3]" | xargs)
echo "SANITY_WEBHOOK_SECRET=\"$webhookSecret\"" >> ".env.development.local"

# Generate rest .env.development.local
colorPrint "- Writing \".env.development.local\""
echo "SANITY_STUDIO_PROJECT_PATH=http://localhost:3000/" >> ".env.development.local"

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
sanity cors add "https://*$projectName.vercel.app" --credentials


# init vercel
vercel project add "$projectName" -S "$scope" -t "$vercelToken" --cwd "$projectName"
vercel git connect "$gitURL" -S "$scope" -t "$vercelToken" --yes --cwd "$projectName"
vercel link -S "$scope" -t "$vercelToken" --yes --cwd "$projectName"

# add vercel env variables
addVercelEnvVar $sanityProjectId NEXT_PUBLIC_SANITY_PROJECT_ID
addVercelEnvVar $sanityProjectId SANITY_STUDIO_API_PROJECT_ID
addVercelEnvVar "production" NEXT_PUBLIC_SANITY_DATASET
addVercelEnvVar "production" SANITY_STUDIO_API_DATASET
addVercelEnvVar $previewSecret SANITY_PREVIEW_SECRET
addVercelEnvVar $webhookSecret SANITY_WEBHOOK_SECRET
addVercelEnvVar "/" SANITY_STUDIO_PROJECT_PATH
addVercelEnvVar $sanityReadToken SANITY_API_READ_TOKEN
addVercelEnvVar $sanityWriteToken SANITY_API_WRITE_TOKEN

#sanity users invite dan@mawla.ie --role administrator
#sanity users invite arjen@mawla.ie --role administrator
#sanity users invite ben@mawla.ie --role administrator

#sanity dataset export production-march.tar.gz development --replace
sanity dataset import cli/setup/production.tar.gz production --replace --allow-failing-assets

Remove tmp directory
rm -rf -R "$projectName"

colorPrint "Done!"
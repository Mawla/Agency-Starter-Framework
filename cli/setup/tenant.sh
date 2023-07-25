printf "\033[0;36mWhat 's the name of the project?\n› \033[0m"
read projectName

printf "\033[0;36mWhat 's the vercel name of the project (e.g xxx.vercel.app)?\n› \033[0m"
read vercelProjectName

rm -rf .env.development.local
touch ".env.development.local"

# get sanity auth token
authToken=$(sanity debug --secrets | grep 'Auth token' | cut -d \' -f2)

# generate new sanity project
echo "\033[0;36m-\033[0m Creating new Sanity project"

result=$(curl --silent POST 'https://api.sanity.io/v2021-06-07/projects' \
-H "Authorization: Bearer $authToken" \
-H 'Content-Type:application/json' \
-d "{
    \"displayName\": \"$projectName\",
    \"organizationId\": \"off6YjRVq\"
}")

echo $result

sanityProjectId=$(echo $result 2>&1 | npx --yes groq-cli '(*).id' | xargs)

echo "\033[0;36m-\033[0m Created sanity project with id '$sanityProjectId'"


# Write project id to .env.development.local
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=$sanityProjectId" >> ".env.development.local"
echo "SANITY_STUDIO_API_PROJECT_ID=$sanityProjectId" >> ".env.development.local"

# Generate dataset
echo "\033[0;36m-\033[0m Generating new Sanity dataset 'development'"
sanity dataset create production --visibility public

echo "NEXT_PUBLIC_SANITY_DATASET=production" >> ".env.development.local"
echo "SANITY_STUDIO_API_DATASET=production" >> ".env.development.local"

# Generate preview secret
echo "\033[0;36m-\033[0m Generating preview secret"
previewSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+' '+*[1]+' '+*[2]+' '+*[3]" | xargs)
echo "SANITY_PREVIEW_SECRET=\"$previewSecret\"" >> ".env.development.local"

echo "\033[0;36m-\033[0m Generating webhook secret"
webhookSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+''+*[1]+''+*[2]+''+*[3]" | xargs)
echo "SANITY_WEBHOOK_SECRET=\"$webhookSecret\"" >> ".env.development.local"

# Generate rest .env.development.local
echo "\033[0;36m-\033[0m Writing ".env.development.local""
echo "SANITY_STUDIO_PROJECT_PATH=http://localhost:3000/" >> ".env.development.local"

echo "\033[0;36m-\033[0m Generating read api key"
writeJson=$(curl POST "https://api.sanity.io/v2021-06-07/projects/$sanityProjectId/tokens" -H "Authorization: Bearer $authToken" -H "Content-Type: application/json" --data-raw '{"label":"preview-write","roleName":"editor"}')
sanityWriteToken=$(echo $writeJson | npx --yes groq-cli '(*).key' | xargs)
echo "SANITY_API_WRITE_TOKEN=$sanityWriteToken" >> ".env.development.local"

echo "\033[0;36m-\033[0m Generating write api key"
readJson=$(curl POST "https://api.sanity.io/v2021-06-07/projects/$sanityProjectId/tokens" -H "Authorization: Bearer $authToken" -H "Content-Type: application/json" --data-raw '{"label":"preview-read","roleName":"viewer"}')
sanityReadToken=$(echo $readJson | npx --yes groq-cli '(*).key' | xargs)
echo "SANITY_API_READ_TOKEN=$sanityReadToken" >> ".env.development.local"

# Write sanity api tokens
echo "" >> ".env.development.local"

# Add CORS origins
echo "\033[0;36m-\033[0m Add localhost CORS origin to Sanity"
sanity cors add http://localhost:3000 --credentials
sanity cors add http://localhost:3333 --credentials
sanity cors add http://localhost:6006 --credentials

sanity cors add https://$(echo $vercelProjectName).vercel.app --credentials
sanity cors add https://*$(echo $vercelProjectName).vercel.app --credentials

# init vercel

vercel git connect https://github.com/Mawla/growth-websites --yes

vercel link

# nextjs sanity project id
echo $sanityProjectId | tr -d '\n' | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production

# # sanity studio project id
echo $sanityProjectId | tr -d '\n' | vercel env add SANITY_STUDIO_API_PROJECT_ID production

# nextjs sanity dataset
echo "production" | tr -d '\n' | vercel env add NEXT_PUBLIC_SANITY_DATASET production

# studio dataset
echo "production" | tr -d '\n' | vercel env add SANITY_STUDIO_API_DATASET production

# sanity studio preview secret
echo $previewSecret | tr -d '\n' | vercel env add SANITY_PREVIEW_SECRET production

# sanity studio webhook secret
echo $webhookSecret | tr -d '\n' | vercel env add SANITY_WEBHOOK_SECRET production

# sanity studio preview path
echo "/" | tr -d '\n' | vercel env add SANITY_STUDIO_PROJECT_PATH production

# sanity studio read token
echo $sanityReadToken | tr -d '\n' | vercel env add SANITY_API_READ_TOKEN production

# sanity studio write token
echo $sanityWriteToken | tr -d '\n' | vercel env add SANITY_API_WRITE_TOKEN production

sanity users invite dan@mawla.ie --role administrator
sanity users invite arjen@mawla.ie --role administrator
sanity users invite ben@mawla.ie --role administrator

echo "\033[0;36mDone!\033[0m"
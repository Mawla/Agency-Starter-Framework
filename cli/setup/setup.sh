printf "\033[0;36mWhat 's the name of the project?\n› \033[0m"
read projectName

printf "\033[0;36mWhat 's the vercel name of the project (e.g xxx.vercel.app)?\n› \033[0m"
read vercelProjectName

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

projectId=$(echo $result 2>&1 | npx --yes groq-cli '(*).id' | xargs)

# write projectId to sanity.cli.ts and sanity.config.ts

echo "\033[0;36m-\033[0m Created sanity project with id '$projectId'"

touch .env.development

# Write project id to .env
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=$projectId" >> .env.development
echo "SANITY_STUDIO_API_PROJECT_ID=$projectId" >> .env.development

# Generate dataset
echo "\033[0;36m-\033[0m Generating new Sanity dataset 'development'"
sanity dataset create development --visibility public
sanity dataset create production --visibility public

echo "NEXT_PUBLIC_SANITY_DATASET=development" >> .env.development
echo "SANITY_STUDIO_API_DATASET=development" >> .env.development

# Generate preview secret
echo "\033[0;36m-\033[0m Generating preview secret"
previewSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+' '+*[1]+' '+*[2]+' '+*[3]" | xargs)
echo "SANITY_PREVIEW_SECRET=\"$previewSecret\"" >> .env.development

echo "\033[0;36m-\033[0m Generating webhook secret"
webhookSecret=$(curl --silent "https://random-word-api.herokuapp.com/word?number=4" \-H "Accept: application/json" 2>&1 |  npx --yes groq-cli "*[0]+''+*[1]+''+*[2]+''+*[3]" | xargs)
echo "SANITY_WEBHOOK_SECRET=\"$webhookSecret\"" >> .env.development

# Generate rest .env
echo "\033[0;36m-\033[0m Writing .env.development"
echo "SANITY_STUDIO_PROJECT_PATH=http://localhost:3000/" >> .env.development

echo "\033[0;36m-\033[0m Generating read api key"
writeJson=$(curl POST "https://api.sanity.io/v2021-06-07/projects/$projectId/tokens" -H "Authorization: Bearer $authToken" -H "Content-Type: application/json" --data-raw '{"label":"preview-write","roleName":"editor"}')
writeToken=$(echo $writeJson | npx --yes groq-cli '(*).key' | xargs)
echo "SANITY_API_WRITE_TOKEN=$writeToken" >> .env.development

echo "\033[0;36m-\033[0m Generating write api key"
readJson=$(curl POST "https://api.sanity.io/v2021-06-07/projects/$projectId/tokens" -H "Authorization: Bearer $authToken" -H "Content-Type: application/json" --data-raw '{"label":"preview-read","roleName":"viewer"}')
readToken=$(echo $readJson | npx --yes groq-cli '(*).key' | xargs)
echo "SANITY_API_READ_TOKEN=$readToken" >> .env.development

# Write sanity api tokens
echo "" >> .env.development

# Add CORS origins
echo "\033[0;36m-\033[0m Add localhost CORS origin to Sanity"
sanity cors add http://localhost:3000 --credentials
sanity cors add http://localhost:3333 --credentials
sanity cors add http://localhost:6006 --credentials

sanity cors add https://$(echo $vercelProjectName).vercel.app --credentials
sanity cors add https://*$(echo $vercelProjectName).vercel.app --credentials

# Create git branch staging
git branch development
git push origin development

# Create git branch staging
git branch staging
git push origin staging

# Create git branch production
git branch production
git push origin production

git branch -d main

git checkout development

echo "\033[0;36mDone!\033[0m"
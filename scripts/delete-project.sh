printf "\033[0;36mWhat 's the Sanity project id?\n› \033[0m"
read projectId

cd ..

# get sanity auth token
authToken=$(sanity debug --secrets | grep 'Auth token' | cut -d \' -f2)

cd -

# delete project
curl -X DELETE "https://api.sanity.io/v2021-06-07/projects/$projectId" \
-H "Authorization: Bearer $authToken" \
-H 'Content-Type: application/json'
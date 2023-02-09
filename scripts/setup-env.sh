sanityProjectId=$(grep 'NEXT_PUBLIC_SANITY_PROJECT_ID' ./.env.development | cut -d \= -f2)
previewSecret=$(grep 'SANITY_PREVIEW_SECRET' ./.env.development | cut -d \= -f2)
webhookSecret=$(grep 'SANITY_WEBHOOK_SECRET' ./.env.development | cut -d \= -f2)
sanityReadToken=$(grep 'SANITY_API_READ_TOKEN' ./.env.development | cut -d \= -f2)
sanityWriteToken=$(grep 'SANITY_API_WRITE_TOKEN' ./.env.development | cut -d \= -f2)

# nextjs sanity project id
echo $sanityProjectId | tr -d '\n' | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID development
echo $sanityProjectId | tr -d '\n' | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID preview
echo $sanityProjectId | tr -d '\n' | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production

# # sanity studio project id
echo $sanityProjectId | tr -d '\n' | vercel env add SANITY_STUDIO_API_PROJECT_ID development
echo $sanityProjectId | tr -d '\n' | vercel env add SANITY_STUDIO_API_PROJECT_ID preview
echo $sanityProjectId | tr -d '\n' | vercel env add SANITY_STUDIO_API_PROJECT_ID production

# nextjs sanity dataset
echo "development | tr -d '\n'" | vercel env add NEXT_PUBLIC_SANITY_DATASET development
echo "development | tr -d '\n'" | vercel env add NEXT_PUBLIC_SANITY_DATASET preview
echo "production | tr -d '\n'" | vercel env add NEXT_PUBLIC_SANITY_DATASET production
echo "staging | tr -d '\n'" | vercel env add NEXT_PUBLIC_SANITY_DATASET preview staging

# studio dataset
echo "development | tr -d '\n'" | vercel env add SANITY_STUDIO_API_DATASET preview
echo "production | tr -d '\n'" | vercel env add SANITY_STUDIO_API_DATASET production
echo "development | tr -d '\n'" | vercel env add SANITY_STUDIO_API_DATASET development
echo "staging | tr -d '\n'" | vercel env add SANITY_STUDIO_API_DATASET preview staging

# sanity studio preview secret
echo $previewSecret | tr -d '\n' | vercel env add SANITY_PREVIEW_SECRET development
echo $previewSecret | tr -d '\n' | vercel env add SANITY_PREVIEW_SECRET preview
echo $previewSecret | tr -d '\n' | vercel env add SANITY_PREVIEW_SECRET production

# sanity studio webhook secret
echo $webhookSecret | tr -d '\n' | vercel env add SANITY_WEBHOOK_SECRET development
echo $webhookSecret | tr -d '\n' | vercel env add SANITY_WEBHOOK_SECRET preview
echo $webhookSecret | tr -d '\n' | vercel env add SANITY_WEBHOOK_SECRET production

# sanity studio preview path
echo "/" | tr -d '\n' | vercel env add SANITY_STUDIO_PROJECT_PATH development
echo "/" | tr -d '\n' | vercel env add SANITY_STUDIO_PROJECT_PATH preview
echo "/" | tr -d '\n' | vercel env add SANITY_STUDIO_PROJECT_PATH production

# nextjs cloudinary name
echo "xxx | tr -d '\n'" | vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME development
echo "xxx | tr -d '\n'" | vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME preview
echo "xxx | tr -d '\n'" | vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME production

# storybook cloudinary name
echo "xxx | tr -d '\n'" | vercel env add STORYBOOK_CLOUDINARY_CLOUD_NAME development
echo "xxx | tr -d '\n'" | vercel env add STORYBOOK_CLOUDINARY_CLOUD_NAME preview
echo "xxx | tr -d '\n'" | vercel env add STORYBOOK_CLOUDINARY_CLOUD_NAME production

# sanity studio read token
echo $sanityReadToken | tr -d '\n' | vercel env add SANITY_API_READ_TOKEN development
echo $sanityReadToken | tr -d '\n' | vercel env add SANITY_API_READ_TOKEN preview
echo $sanityReadToken | tr -d '\n' | vercel env add SANITY_API_READ_TOKEN production

# sanity studio write token
echo $sanityWriteToken | tr -d '\n' | vercel env add SANITY_API_WRITE_TOKEN development
echo $sanityWriteToken | tr -d '\n' | vercel env add SANITY_API_WRITE_TOKEN preview
echo $sanityWriteToken | tr -d '\n' | vercel env add SANITY_API_WRITE_TOKEN production
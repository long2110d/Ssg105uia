# Auto-deploy Rule

- Whenever you successfully complete a coding task or make changes requested by the user, you must automatically commit the changes to Git and push them to the remote repository.
- Sau khi push code lên Git, bạn cần phải deploy trực tiếp lên Vercel bằng Vercel CLI để đảm bảo trang web được cập nhật đúng thư mục dự án.
- Use the following commands:
  - `git add .`
  - `git commit -m "feat: <description of changes>"`
  - `git push`
  - `cd "New folder" && npx vercel --prod --yes`
- Explain to the user that the code has been pushed to Git and deployed to Vercel directly.

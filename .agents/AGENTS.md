# Auto-deploy Rule

- Whenever you successfully complete a coding task or make changes requested by the user, you must automatically commit the changes to Git, push them to the remote repository, and deploy to Vercel.
- Sau khi push code lên Git, bạn cần phải deploy trực tiếp lên Vercel bằng Vercel CLI để đảm bảo trang web được cập nhật đúng thư mục dự án.
- **Lưu ý quan trọng cho Windows PowerShell**: Không sử dụng `&&` để nối các câu lệnh vì PowerShell 5.1 sẽ báo lỗi cú pháp. Hãy dùng dấu chấm phẩy `;` để nối câu lệnh.
- Sử dụng các câu lệnh sau tùy theo môi trường shell:
  - **Môi trường Windows PowerShell**:
    ```powershell
    git add .
    git commit -m "feat: <description of changes>"
    # Deploy Vercel trước để tránh bị nghẽn nếu git push bị treo:
    cd "New folder"; npx vercel --prod --yes
    # Sau đó mới chạy git push (ở thư mục gốc):
    cd ..; git push
    ```
  - **Môi trường Bash / Linux / macOS**:
    ```bash
    git add . && git commit -m "feat: <description of changes>"
    # Deploy Vercel trước:
    cd "New folder" && npx vercel --prod --yes
    # Sau đó mới chạy git push (ở thư mục gốc):
    cd .. && git push
    ```
- Nếu lệnh `git push` bị treo hoặc gặp lỗi về xác thực (authentication), hãy chạy lệnh deploy Vercel một cách độc lập để đảm bảo sản phẩm được cập nhật lên web đúng hẹn.
- Explain to the user that the code has been pushed to Git (or committed) and deployed to Vercel directly.

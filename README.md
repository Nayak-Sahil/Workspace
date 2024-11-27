# Workspace: Permission-Controlled Collaboration
A platform where **users can collaboratively edit, view, and share content** based on assigned roles.

This project **implements a Role-Based Access Control (RBAC)** for managing user roles and workspace permissions. It provides users with different levels of access, such as Admin, Editor, and Viewer, to a shared workspace where they can perform actions based on their roles.

<div align="center">
    <img src="https://cdn.dribbble.com/userupload/17754770/file/original-acd7a54947cef57952ca71cb0063168b.png?resize=1024x479&vertical=center" width="600">
</div>

### 🌐 Access
- **UI Design**: [View the UI Design on Dribbble](https://dribbble.com/shots/25249723-Collaborative-Workspace)
- **Frontend Live Demo**: [Access the Frontend Application](https://neon-syrniki-f11b01.netlify.app/)
- **Backend API**: [Explore the Backend API](https://workspace-rust-chi.vercel.app/)
- **API Guide**: [View the API Documentation](https://github.com/Nayak-Sahil/Workspace/blob/main/API_GUIDE.md)

### 🛠️ Technologies
- **Frontend**: React.js, Redux Toolkit, shadcn/ui,
- **Backend**: Node.js, Express.js,
- **Database**: Mock Data (JSON),
- **Deployment**: Netlify, Vercel

### ⚙️ Core Features
- **Workspace Management**: View, edit, and share content in a shared workspace.
- **Role-Based Access**: Admin, Editor, and Viewer roles with different permissions. 
- **Authentication & Authorization**: - Secure login and role validation.
- **JWT Token-Based Authentication**: Ensures secure access to resources.

### ⚡ Middlewares
The backend was built with Node.js and Express.js, featuring two core middleware utilities:

1. **ValidateRole**: Ensures user actions comply with their permissions.
2. **ValidateToken**: Authenticates user requests securely.


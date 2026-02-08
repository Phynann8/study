# Deployment Guide: Windows Server + IIS

This guide will walk you through hosting the **Khmer Code** application on your Windows Server using IIS as a Reverse Proxy and PM2 for process management.

## Prerequisites
1.  **Node.js**: Installed on the server.
2.  **IIS (Internet Information Services)**: Enabled.
3.  **URL Rewrite Module**: Installed for IIS.
4.  **Application Request Routing (ARR)**: Installed for IIS.

## Step 1: Install Process Manager (PM2)
Open PowerShell as Administrator and run:
```powershell
npm install pm2 -g
```

## Step 2: Start the Application
Navigate to the project directory:
```powershell
cd "e:\2_Computer Science\12_Personal_Website_Dev\study_repo"
```
Start the app using our config:
```powershell
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*Your app is now running on `localhost:3000`.*

## Step 3: Configure IIS
1.  Open **IIS Manager**.
2.  Right-click **Sites** -> **Add Website**.
    -   **Site name**: `KhmerCode`
    -   **Physical path**: `e:\2_Computer Science\12_Personal_Website_Dev\study_repo`
    -   **Port**: `80` (or your desired port)
3.  **IMPORTANT**: Since we are using a Reverse Proxy, we need to setup the Rewrite Rule.
    -   I have already created a `web.config` file in your project folder. IIS should automatically pick this up.
    -   If not, open **URL Rewrite** feature in IIS for your site.
    -   Verify there is a rule pointing to `http://localhost:3000/{R:1}`.

## Step 4: Verify
Open your browser and navigate to `http://localhost` (or your public IP). You should see the Khmer Code website!

---
**Troubleshooting**:
-   If you see a 500 error, ensure **URL Rewrite** and **ARR** modules are installed.
-   Check PM2 status: `pm2 status`

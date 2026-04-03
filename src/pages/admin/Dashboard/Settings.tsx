import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Toggle dark mode (replace with your theme logic)
  const handleToggleDark = () => {
    setDarkMode((d) => !d);
    // Add your theme switching logic here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Manage your account and preferences</p>
      </div>
      {/* Profile Section - Takes full width */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
        <div className="space-y-6">
          {/* Profile Info */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-profile.png" alt="Profile" />
              <AvatarFallback className="text-xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">admin@email.com</p>
              <p className="text-gray-500 text-xs mt-1">Member since Jan 2024</p>
            </div>
            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile Information</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-profile.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Picture</Button>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <Input placeholder="Full Name" defaultValue="John Doe" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <Input placeholder="Email" defaultValue="admin@email.com" disabled className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <Input placeholder="Tell us about yourself" className="mt-1" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Change Password */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Security</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Manage your password and security settings</p>
            <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                    <Input type="password" placeholder="Current Password" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <Input type="password" placeholder="New Password" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm New Password" className="mt-1" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Update Password</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Preferences and Notifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preferences Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Switch between dark and light mode</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={handleToggleDark} />
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Digests</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly blog performance summaries</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Compact View</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show condensed dashboard layout</p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">All Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive all notification types</p>
              </div>
              <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Post Comments</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notify when someone comments on your posts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Milestones</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Celebrate when you reach view milestones</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Marketing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive tips and product updates</p>
              </div>
              <Switch />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;

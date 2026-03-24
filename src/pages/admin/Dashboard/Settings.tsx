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
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg mb-2">Account</h3>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-profile.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-gray-500 text-sm">admin@email.com</div>
            </div>
          </div>
          <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-fit">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-profile.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Picture</Button>
                </div>
                <Input placeholder="Full Name" defaultValue="John Doe" />
                <Input
                  placeholder="Email"
                  defaultValue="admin@email.com"
                  disabled
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
        {/* Security Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg mb-2">Security</h3>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-sm">Change your password</span>
            <Dialog
              open={passwordDialogOpen}
              onOpenChange={setPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-fit">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Input type="password" placeholder="Current Password" />
                  <Input type="password" placeholder="New Password" />
                  <Input type="password" placeholder="Confirm New Password" />
                  <span className="text-xs text-gray-500">
                    After verification, a reset link will be sent to your
                    registered email.
                  </span>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Send Reset Email</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        {/* Notifications Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg mb-2">Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Enable notifications</span>
            <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
          </div>
        </section>
        {/* Theme Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg mb-2">Theme</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              Switch between dark and light mode
            </span>
            <Switch checked={darkMode} onCheckedChange={handleToggleDark} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;

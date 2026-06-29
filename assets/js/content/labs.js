window.LABS = [
  {
    "id": "Lab 01",
    "num": 1,
    "group": "SYSTEM MANAGEMENT",
    "title": "Provisioning Storage with LVM",
    "desc": "A new 500GB disk has been attached to lab-srv01 and the application team needs flexible, growable storage. You initialize the disk as an LVM physical volume, build a volume group, and carve out a logical volume you can later extend.",
    "objectives": [
      "Initialize a raw disk as an LVM physical volume.",
      "Create a volume group and a logical volume on top of it.",
      "Extend a logical volume and verify the resulting layout."
    ],
    "console": {
      "host": "lab-srv01",
      "boot": [
        "[SYS] LVM provisioning console online.",
        "[SYS] New 500GB disk /dev/sdb detected, unconfigured."
      ],
      "tasks": [
        { "id": "t1", "label": "Initialize /dev/sdb as a physical volume" },
        { "id": "t2", "label": "Create volume group vg_data" },
        { "id": "t3", "label": "Create and grow a logical volume" },
        { "id": "t4", "label": "Verify the volume group layout" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Tool to create a physical volume",
          "options": ["mkfs.xfs", "pvcreate", "fdisk", "mount"],
          "correct": "pvcreate",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to grow an existing logical volume",
          "options": ["lvextend", "vgremove", "pvscan", "blkid"],
          "correct": "lvextend",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "MAP COMMAND TO TASK",
        "placeholder": "vgcreate vg_data /dev/sdb",
        "button": "Run",
        "response": "[LVM] Volume group vg_data created with 1 PV.\n[LVM] 500.00 GiB available in vg_data.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "vgs",
          "out": "VG       #PV #LV #SN Attr   VSize   VFree\nvg_data    1   1   0 wz--n- 500.00g 250.00g",
          "task": "t4"
        },
        { "cmd": "lsblk", "out": "NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsdb               8:16   0  500G  0 disk\nvg_data-lv_app  253:0    0  250G  0 lvm  /app" },
        { "cmd": "show status", "out": "LVM engine nominal." }
      ]
    }
  },
  {
    "id": "Lab 02",
    "num": 2,
    "group": "SYSTEM MANAGEMENT",
    "title": "Partitioning and Filesystems (fdisk/mkfs/fstab)",
    "desc": "A second disk needs a fresh partition formatted with a journaling filesystem and mounted persistently at boot. You partition /dev/sdc with fdisk, create an XFS filesystem, and add a durable entry to /etc/fstab using the partition UUID.",
    "objectives": [
      "Create a primary partition on a raw disk with fdisk.",
      "Format the new partition with a journaling filesystem.",
      "Add a persistent mount entry to /etc/fstab and verify it."
    ],
    "console": {
      "host": "lab-srv02",
      "boot": [
        "[SYS] Disk provisioning console online.",
        "[SYS] /dev/sdc present with no partition table."
      ],
      "tasks": [
        { "id": "t1", "label": "Create a primary partition on /dev/sdc" },
        { "id": "t2", "label": "Format /dev/sdc1 as XFS" },
        { "id": "t3", "label": "Add a persistent fstab mount by UUID" },
        { "id": "t4", "label": "Verify the mounted filesystem" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Tool to edit the partition table interactively",
          "options": ["fdisk", "mkfs.ext4", "tune2fs", "df"],
          "correct": "fdisk",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to create an XFS filesystem",
          "options": ["mkfs.xfs", "xfs_repair", "resize2fs", "fsck.ext4"],
          "correct": "mkfs.xfs",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "ADD FSTAB ENTRY BY UUID",
        "placeholder": "UUID=a1b2-c3d4 /data xfs defaults 0 0",
        "button": "Apply",
        "response": "[FSTAB] Entry written to /etc/fstab.\n[MOUNT] mount -a succeeded, /data is mounted.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "df -hT /data",
          "out": "Filesystem     Type  Size  Used Avail Use% Mounted on\n/dev/sdc1      xfs   200G  1.1G  199G   1% /data",
          "task": "t4"
        },
        { "cmd": "blkid /dev/sdc1", "out": "/dev/sdc1: UUID=\"a1b2-c3d4\" TYPE=\"xfs\" PARTUUID=\"e5f6-7890\"" },
        { "cmd": "show status", "out": "Filesystem subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 03",
    "num": 3,
    "group": "SYSTEM MANAGEMENT",
    "title": "Configuring Networking with nmcli",
    "desc": "lab-srv03 must move from DHCP to a documented static address for a server role. Using NetworkManager's nmcli, you set a static IPv4 address, gateway, and DNS on the connection, then bring it up and confirm reachability.",
    "objectives": [
      "Inspect existing NetworkManager connections.",
      "Configure a static IPv4 address, gateway, and DNS with nmcli.",
      "Apply the connection and verify the active addressing."
    ],
    "console": {
      "host": "lab-srv03",
      "boot": [
        "[SYS] NetworkManager console online.",
        "[SYS] Connection 'ens33' currently using DHCP."
      ],
      "tasks": [
        { "id": "t1", "label": "Set the connection to manual addressing" },
        { "id": "t2", "label": "Apply a static IP, gateway, and DNS" },
        { "id": "t3", "label": "Reactivate the connection" },
        { "id": "t4", "label": "Verify the active IPv4 configuration" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "ipv4.method value for a static address",
          "options": ["auto", "manual", "link-local", "shared"],
          "correct": "manual",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "nmcli verb to re-enable a connection",
          "options": ["nmcli connection up", "nmcli device disconnect", "nmcli radio off", "nmcli general status"],
          "correct": "nmcli connection up",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "SET STATIC ADDRESSING",
        "placeholder": "nmcli con mod ens33 ipv4.addresses 10.0.0.20/24",
        "button": "Run",
        "response": "[NM] ipv4.addresses set to 10.0.0.20/24.\n[NM] ipv4.gateway 10.0.0.1, ipv4.dns 10.0.0.53 applied.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "nmcli -g IP4.ADDRESS device show ens33",
          "out": "10.0.0.20/24",
          "task": "t4"
        },
        { "cmd": "nmcli connection show", "out": "NAME   UUID                                  TYPE      DEVICE\nens33  9c2f1a7e-3b4c-4d5e-8f10-aa11bb22cc33  ethernet  ens33" },
        { "cmd": "show status", "out": "NetworkManager nominal." }
      ]
    }
  },
  {
    "id": "Lab 04",
    "num": 4,
    "group": "SYSTEM MANAGEMENT",
    "title": "Archiving and Backups with tar & rsync",
    "desc": "The /srv/web directory must be backed up nightly and mirrored to a backup host. You build a compressed tar archive, then use rsync to synchronize the live tree to a remote target efficiently, and confirm the archive integrity.",
    "objectives": [
      "Create a compressed tar archive of a directory tree.",
      "Mirror a directory to a remote host with rsync.",
      "Verify archive contents and the synchronized copy."
    ],
    "console": {
      "host": "lab-srv04",
      "boot": [
        "[SYS] Backup console online.",
        "[SYS] Source tree /srv/web ready (2.3GB)."
      ],
      "tasks": [
        { "id": "t1", "label": "Create a gzip-compressed tar archive" },
        { "id": "t2", "label": "Mirror /srv/web to the backup host" },
        { "id": "t3", "label": "List the archive contents" },
        { "id": "t4", "label": "Confirm the remote sync completed" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "tar flags to create a gzip archive",
          "options": ["-xvf", "-czvf", "-tvf", "-rvf"],
          "correct": "-czvf",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "rsync option for archive mode with progress",
          "options": ["-avz", "--delete-after only", "-n", "--list-only"],
          "correct": "-avz",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN ARCHIVE LISTING",
        "placeholder": "tar -tzvf web-backup.tar.gz",
        "button": "Run",
        "response": "[TAR] web/index.html\n[TAR] web/css/site.css\n[TAR] web/js/app.js\n[TAR] archive listing complete, 184 entries.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "rsync -avz /srv/web/ backup:/backups/web/",
          "out": "sending incremental file list\n./\nindex.html\ncss/site.css\njs/app.js\n\nsent 2,415,003 bytes  received 188 bytes  1,610,127.33 bytes/sec\ntotal size is 2,410,884  speedup is 1.00",
          "task": "t4"
        },
        { "cmd": "ls -lh web-backup.tar.gz", "out": "-rw-r--r-- 1 root root 612M Jun 29 02:00 web-backup.tar.gz" },
        { "cmd": "show status", "out": "Backup subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 05",
    "num": 5,
    "group": "SERVICES & USER MANAGEMENT",
    "title": "Managing Permissions and Ownership",
    "desc": "A shared project directory has the wrong ownership and overly permissive access. You correct ownership to the project group, set restrictive permissions, and apply a setgid bit so new files inherit the group.",
    "objectives": [
      "Set group ownership recursively on a directory tree.",
      "Apply numeric permissions to restrict access.",
      "Use the setgid bit so new files inherit the group, then verify."
    ],
    "console": {
      "host": "lab-srv05",
      "boot": [
        "[SYS] Permissions console online.",
        "[SYS] /srv/project owned by root:root, mode 0777."
      ],
      "tasks": [
        { "id": "t1", "label": "Set group ownership to devteam" },
        { "id": "t2", "label": "Restrict permissions to 2770" },
        { "id": "t3", "label": "Set the setgid bit for group inheritance" },
        { "id": "t4", "label": "Verify the resulting permissions" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command to recursively change group ownership",
          "options": ["chgrp -R", "chmod -R", "umask", "chattr"],
          "correct": "chgrp -R",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Symbolic mode that adds setgid",
          "options": ["g+s", "o+w", "u-x", "a+r"],
          "correct": "g+s",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "APPLY NUMERIC PERMISSIONS",
        "placeholder": "chmod 2770 /srv/project",
        "button": "Apply",
        "response": "[PERM] /srv/project set to mode 2770.\n[PERM] owner rwx, group rwx, other none, setgid on.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "stat -c '%A %U:%G' /srv/project",
          "out": "drwxrws--- root:devteam",
          "task": "t4"
        },
        { "cmd": "ls -ld /srv/project", "out": "drwxrws--- 4 root devteam 4096 Jun 29 10:14 /srv/project" },
        { "cmd": "show status", "out": "Permission subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 06",
    "num": 6,
    "group": "SERVICES & USER MANAGEMENT",
    "title": "User and Group Account Administration",
    "desc": "A new engineer is joining and needs an account with the right shell, home directory, and group memberships. You create the user and a project group, add the user to a supplementary group, and confirm the account settings.",
    "objectives": [
      "Create a group for the project team.",
      "Create a user with a home directory and login shell.",
      "Add the user to a supplementary group and verify membership."
    ],
    "console": {
      "host": "lab-srv06",
      "boot": [
        "[SYS] Account administration console online.",
        "[SYS] No account exists for 'jdoe'."
      ],
      "tasks": [
        { "id": "t1", "label": "Create the devteam group" },
        { "id": "t2", "label": "Create user jdoe with a home directory" },
        { "id": "t3", "label": "Add jdoe to the wheel supplementary group" },
        { "id": "t4", "label": "Verify jdoe group memberships" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command to create a new group",
          "options": ["groupadd", "useradd", "passwd", "chage"],
          "correct": "groupadd",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "usermod flags to append a supplementary group",
          "options": ["-aG", "-d", "-L", "-e"],
          "correct": "-aG",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "CREATE THE USER ACCOUNT",
        "placeholder": "useradd -m -s /bin/bash -g devteam jdoe",
        "button": "Run",
        "response": "[USER] User jdoe created (uid=1007).\n[USER] Home /home/jdoe created, primary group devteam.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "id jdoe",
          "out": "uid=1007(jdoe) gid=1005(devteam) groups=1005(devteam),10(wheel)",
          "task": "t4"
        },
        { "cmd": "getent passwd jdoe", "out": "jdoe:x:1007:1005:John Doe:/home/jdoe:/bin/bash" },
        { "cmd": "show status", "out": "Account subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 07",
    "num": 7,
    "group": "SERVICES & USER MANAGEMENT",
    "title": "Process Control and Job Scheduling (ps/top/nice/cron)",
    "desc": "A batch process is starving interactive work, and a maintenance job needs to run nightly. You lower the batch job's priority with renice, identify the offender with ps, and schedule a recurring cron job, then confirm the crontab.",
    "objectives": [
      "Identify a CPU-heavy process by inspecting the process table.",
      "Reduce a running process priority with renice.",
      "Schedule a recurring job in cron and verify the crontab."
    ],
    "console": {
      "host": "lab-srv07",
      "boot": [
        "[SYS] Process control console online.",
        "[SYS] PID 4821 'batch_etl' consuming 98% CPU."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the top CPU consumer" },
        { "id": "t2", "label": "Lower the batch process priority with renice" },
        { "id": "t3", "label": "Schedule a nightly cron job" },
        { "id": "t4", "label": "Verify the installed crontab" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command to change a running process priority",
          "options": ["renice", "kill -9", "nohup", "jobs"],
          "correct": "renice",
          "task": "t2"
        },
        {
          "id": "c2",
          "label": "Crontab field order for a 2:00 AM daily job",
          "options": ["0 2 * * *", "* * 2 0 0", "2 0 * * 0", "0 0 2 * *"],
          "correct": "0 2 * * *",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "FIND THE CPU OFFENDER",
        "placeholder": "ps -eo pid,pcpu,comm --sort=-pcpu | head",
        "button": "Run",
        "response": "[PS]   PID %CPU COMMAND\n[PS]  4821 98.0 batch_etl\n[PS]   911  3.2 sshd\n[PS] top consumer identified: PID 4821.",
        "task": "t1"
      },
      "commands": [
        {
          "cmd": "crontab -l",
          "out": "# m h dom mon dow command\n0 2 * * * /usr/local/bin/maintenance.sh",
          "task": "t4"
        },
        { "cmd": "renice +10 -p 4821", "out": "4821 (process ID) old priority 0, new priority 10" },
        { "cmd": "show status", "out": "Scheduler nominal." }
      ]
    }
  },
  {
    "id": "Lab 08",
    "num": 8,
    "group": "SERVICES & USER MANAGEMENT",
    "title": "Managing Services with systemd",
    "desc": "The nginx service must start automatically and be running after maintenance. Using systemctl you enable the unit for boot, start it now, and inspect its status and journal to confirm a clean, active state.",
    "objectives": [
      "Enable a service to start at boot with systemd.",
      "Start a service immediately and confirm it is active.",
      "Inspect unit status and the journal for the service."
    ],
    "console": {
      "host": "lab-srv08",
      "boot": [
        "[SYS] systemd management console online.",
        "[SYS] nginx.service is loaded but inactive (dead)."
      ],
      "tasks": [
        { "id": "t1", "label": "Enable nginx to start at boot" },
        { "id": "t2", "label": "Start the nginx service now" },
        { "id": "t3", "label": "Verify the unit is active and running" },
        { "id": "t4", "label": "Review the service journal" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "systemctl verb to enable a unit at boot",
          "options": ["enable", "mask", "isolate", "reload-or-restart"],
          "correct": "enable",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to read a unit's logs",
          "options": ["journalctl -u nginx", "systemctl daemon-reexec", "dmesg -c", "logrotate -f"],
          "correct": "journalctl -u nginx",
          "task": "t4"
        }
      ],
      "payload": {
        "label": "START THE SERVICE",
        "placeholder": "systemctl start nginx",
        "button": "Run",
        "response": "[SYSTEMD] nginx.service started.\n[SYSTEMD] Main PID 2310 (nginx), running.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "systemctl is-active nginx",
          "out": "active",
          "task": "t3"
        },
        { "cmd": "systemctl status nginx", "out": "* nginx.service - The nginx HTTP server\n   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled)\n   Active: active (running) since Mon 2026-06-29 10:21:04 UTC" },
        { "cmd": "show status", "out": "systemd nominal." }
      ]
    }
  },
  {
    "id": "Lab 09",
    "num": 9,
    "group": "SECURITY",
    "title": "Configuring a Firewall with firewalld",
    "desc": "A web server must permit HTTP and HTTPS while blocking everything else. Using firewalld you add the services to the public zone permanently, reload the runtime, and confirm the active rule set.",
    "objectives": [
      "Add permitted services to a firewalld zone permanently.",
      "Reload firewalld so permanent rules take effect.",
      "List and verify the active zone configuration."
    ],
    "console": {
      "host": "lab-srv09",
      "boot": [
        "[SYS] firewalld console online.",
        "[SYS] Default zone 'public' allows ssh only."
      ],
      "tasks": [
        { "id": "t1", "label": "Permit the http service permanently" },
        { "id": "t2", "label": "Permit the https service permanently" },
        { "id": "t3", "label": "Reload firewalld to apply permanent rules" },
        { "id": "t4", "label": "Verify the active public zone" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Flag that makes a firewalld rule persistent",
          "options": ["--permanent", "--timeout", "--panic-on", "--runtime-to-permanent only"],
          "correct": "--permanent",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to apply permanent rules without restart",
          "options": ["firewall-cmd --reload", "systemctl mask firewalld", "iptables -F", "firewall-cmd --panic-on"],
          "correct": "firewall-cmd --reload",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "ADD A PERMITTED SERVICE",
        "placeholder": "firewall-cmd --permanent --add-service=https",
        "button": "Run",
        "response": "[FW] success\n[FW] https added to zone public (permanent).",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "firewall-cmd --list-all",
          "out": "public (active)\n  target: default\n  interfaces: ens33\n  services: ssh http https\n  ports:",
          "task": "t4"
        },
        { "cmd": "firewall-cmd --get-active-zones", "out": "public\n  interfaces: ens33" },
        { "cmd": "show status", "out": "firewalld nominal." }
      ]
    }
  },
  {
    "id": "Lab 10",
    "num": 10,
    "group": "SECURITY",
    "title": "Hardening SSH and sudo",
    "desc": "The SSH daemon allows risky defaults and admins need least-privilege escalation. You disable root login and password authentication in sshd_config, grant a group sudo rights, and validate the configuration before reloading.",
    "objectives": [
      "Disable direct root login over SSH.",
      "Enforce key-based authentication by disabling passwords.",
      "Grant a group sudo access and validate the sudoers entry."
    ],
    "console": {
      "host": "lab-srv10",
      "boot": [
        "[SYS] SSH hardening console online.",
        "[SYS] sshd_config currently permits root and password logins."
      ],
      "tasks": [
        { "id": "t1", "label": "Disable root login in sshd_config" },
        { "id": "t2", "label": "Disable SSH password authentication" },
        { "id": "t3", "label": "Grant the wheel group sudo access" },
        { "id": "t4", "label": "Validate the sudoers and sshd config" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "sshd_config directive to block root login",
          "options": ["PermitRootLogin no", "PermitRootLogin yes", "AllowRootLogin all", "RootLogin enabled"],
          "correct": "PermitRootLogin no",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "sshd_config directive to require keys only",
          "options": ["PasswordAuthentication no", "ChallengeResponse yes", "UsePAM yes", "PermitEmptyPasswords yes"],
          "correct": "PasswordAuthentication no",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "ADD A SUDOERS RULE",
        "placeholder": "%wheel ALL=(ALL) ALL",
        "button": "Apply",
        "response": "[SUDO] Rule written via visudo to /etc/sudoers.d/wheel.\n[SUDO] Members of wheel may run all commands.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "visudo -c && sshd -t",
          "out": "/etc/sudoers: parsed OK\n/etc/sudoers.d/wheel: parsed OK\nsshd: no errors detected in configuration",
          "task": "t4"
        },
        { "cmd": "grep -E 'PermitRootLogin|PasswordAuthentication' /etc/ssh/sshd_config", "out": "PermitRootLogin no\nPasswordAuthentication no" },
        { "cmd": "show status", "out": "Hardening subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 11",
    "num": 11,
    "group": "SECURITY",
    "title": "SELinux Contexts and Booleans",
    "desc": "A web server serving content from a non-default path returns permission denied due to SELinux. You confirm enforcing mode, relabel the directory with the correct file context, and enable a boolean to allow the needed behavior.",
    "objectives": [
      "Confirm SELinux is in enforcing mode.",
      "Apply the correct file context to a custom web root.",
      "Enable an SELinux boolean and verify the contexts."
    ],
    "console": {
      "host": "lab-srv11",
      "boot": [
        "[SYS] SELinux console online.",
        "[SYS] httpd denied access to /web (wrong context)."
      ],
      "tasks": [
        { "id": "t1", "label": "Confirm SELinux enforcing mode" },
        { "id": "t2", "label": "Set the httpd file context on /web" },
        { "id": "t3", "label": "Enable the httpd network connect boolean" },
        { "id": "t4", "label": "Verify the applied file context" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command reporting the current SELinux mode",
          "options": ["getenforce", "setenforce 0", "semanage login", "restorecon -n"],
          "correct": "getenforce",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to persistently enable a boolean",
          "options": ["setsebool -P", "audit2allow", "chcon -t", "semodule -r"],
          "correct": "setsebool -P",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "RELABEL THE WEB ROOT",
        "placeholder": "semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'",
        "button": "Apply",
        "response": "[SELINUX] fcontext rule added for /web.\n[SELINUX] restorecon -Rv /web applied httpd_sys_content_t.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "ls -Zd /web",
          "out": "unconfined_u:object_r:httpd_sys_content_t:s0 /web",
          "task": "t4"
        },
        { "cmd": "getsebool httpd_can_network_connect", "out": "httpd_can_network_connect --> on" },
        { "cmd": "show status", "out": "SELinux policy nominal." }
      ]
    }
  },
  {
    "id": "Lab 12",
    "num": 12,
    "group": "SECURITY",
    "title": "File Encryption and Integrity (gpg/sha256sum/AIDE)",
    "desc": "Sensitive files must be encrypted at rest and the system monitored for tampering. You encrypt a file with GPG, generate and verify a SHA-256 checksum, and initialize an AIDE database for integrity checking.",
    "objectives": [
      "Encrypt a file symmetrically with GPG.",
      "Generate and verify a SHA-256 checksum.",
      "Initialize an AIDE integrity database and confirm the baseline."
    ],
    "console": {
      "host": "lab-srv12",
      "boot": [
        "[SYS] Integrity console online.",
        "[SYS] secrets.txt present, no checksum recorded."
      ],
      "tasks": [
        { "id": "t1", "label": "Encrypt secrets.txt with GPG" },
        { "id": "t2", "label": "Generate a SHA-256 checksum file" },
        { "id": "t3", "label": "Verify the checksum matches" },
        { "id": "t4", "label": "Initialize the AIDE baseline database" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "GPG option for symmetric encryption",
          "options": ["--symmetric", "--gen-key", "--export", "--list-keys"],
          "correct": "--symmetric",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to verify a recorded checksum",
          "options": ["sha256sum -c", "md5sum --tag", "openssl genrsa", "gpg --verify only"],
          "correct": "sha256sum -c",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "RECORD A CHECKSUM",
        "placeholder": "sha256sum secrets.txt > secrets.sha256",
        "button": "Run",
        "response": "[HASH] 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b... secrets.txt\n[HASH] secrets.sha256 written.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "aide --init",
          "out": "Start timestamp: 2026-06-29 11:02:14\nAIDE initialized database at /var/lib/aide/aide.db.new.gz\nNumber of entries: 48213\nThe attributes of the (in)compatible database were stored.",
          "task": "t4"
        },
        { "cmd": "sha256sum -c secrets.sha256", "out": "secrets.txt: OK" },
        { "cmd": "show status", "out": "Integrity subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 13",
    "num": 13,
    "group": "AUTOMATION & SCRIPTING",
    "title": "Writing a Bash Backup Script",
    "desc": "Backups are currently run by hand. You write a Bash script with a shebang and variables that timestamps and archives a directory, make it executable, and run it to confirm a dated archive is produced.",
    "objectives": [
      "Add a proper shebang and variables to a Bash script.",
      "Build a timestamped archive inside the script.",
      "Make the script executable and confirm it runs."
    ],
    "console": {
      "host": "lab-srv13",
      "boot": [
        "[SYS] Scripting console online.",
        "[SYS] backup.sh created, not yet executable."
      ],
      "tasks": [
        { "id": "t1", "label": "Add the correct Bash shebang line" },
        { "id": "t2", "label": "Make the script executable" },
        { "id": "t3", "label": "Run the script to produce a timestamped archive" },
        { "id": "t4", "label": "Verify the dated archive was created" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Correct shebang for a Bash script",
          "options": ["#!/bin/bash", "#/bin/bash", "#!bash", "// bash"],
          "correct": "#!/bin/bash",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to make the script executable",
          "options": ["chmod +x backup.sh", "chown +x backup.sh", "bash -n backup.sh", "touch backup.sh"],
          "correct": "chmod +x backup.sh",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN THE BACKUP SCRIPT",
        "placeholder": "./backup.sh /srv/web",
        "button": "Run",
        "response": "[SCRIPT] Archiving /srv/web ...\n[SCRIPT] Created /backups/web-20260629-110512.tar.gz\n[SCRIPT] Backup complete (exit 0).",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "ls -1 /backups",
          "out": "web-20260629-110512.tar.gz",
          "task": "t4"
        },
        { "cmd": "bash -n backup.sh", "out": "(no syntax errors detected)" },
        { "cmd": "show status", "out": "Scripting subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 14",
    "num": 14,
    "group": "AUTOMATION & SCRIPTING",
    "title": "Conditionals and Loops in Bash",
    "desc": "A script must react to conditions and iterate over a list of hosts. You write an if test that checks a file, build a for loop over hostnames, and run the script to verify the branching and iteration behave correctly.",
    "objectives": [
      "Use a conditional test to check for a file.",
      "Iterate over a list with a for loop.",
      "Run the script and verify the control flow output."
    ],
    "console": {
      "host": "lab-srv14",
      "boot": [
        "[SYS] Control-flow console online.",
        "[SYS] check.sh stub loaded for editing."
      ],
      "tasks": [
        { "id": "t1", "label": "Add a file-existence conditional test" },
        { "id": "t2", "label": "Add a for loop over the host list" },
        { "id": "t3", "label": "Run the script and observe the branching" },
        { "id": "t4", "label": "Verify the loop iterated each host" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Correct test for an existing regular file",
          "options": ["[ -f /etc/hosts ]", "[ -d /etc/hosts ]", "[ /etc/hosts -eq 1 ]", "[ == /etc/hosts ]"],
          "correct": "[ -f /etc/hosts ]",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Correct for-loop header over a list",
          "options": ["for h in web1 web2 web3; do", "foreach h (web1 web2); {", "loop h: web1 web2", "while h in list do"],
          "correct": "for h in web1 web2 web3; do",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "RUN THE SCRIPT",
        "placeholder": "./check.sh",
        "button": "Run",
        "response": "[SCRIPT] /etc/hosts exists, proceeding.\n[SCRIPT] checking web1 ... ok\n[SCRIPT] checking web2 ... ok\n[SCRIPT] checking web3 ... ok",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "./check.sh | grep -c checking",
          "out": "3",
          "task": "t4"
        },
        { "cmd": "bash -n check.sh", "out": "(no syntax errors detected)" },
        { "cmd": "show status", "out": "Control-flow subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 15",
    "num": 15,
    "group": "AUTOMATION & SCRIPTING",
    "title": "Version Control with Git",
    "desc": "Infrastructure scripts need to live in version control. You initialize a Git repository, stage and commit the scripts, add a remote, and confirm the commit history and tracking branch are correct.",
    "objectives": [
      "Initialize a Git repository and stage files.",
      "Create a commit with a message.",
      "Add a remote and verify the log and remote."
    ],
    "console": {
      "host": "lab-srv15",
      "boot": [
        "[SYS] Git console online.",
        "[SYS] /opt/scripts is not yet a repository."
      ],
      "tasks": [
        { "id": "t1", "label": "Initialize the repository and stage files" },
        { "id": "t2", "label": "Create the first commit" },
        { "id": "t3", "label": "Add an origin remote" },
        { "id": "t4", "label": "Verify the commit log" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command to stage all changes",
          "options": ["git add .", "git push .", "git clone .", "git reset ."],
          "correct": "git add .",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to register a remote named origin",
          "options": ["git remote add origin", "git checkout origin", "git branch origin", "git fetch origin only"],
          "correct": "git remote add origin",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "CREATE THE FIRST COMMIT",
        "placeholder": "git commit -m 'Initial import of scripts'",
        "button": "Run",
        "response": "[GIT] [main (root-commit) 4f1a9c2] Initial import of scripts\n[GIT]  3 files changed, 128 insertions(+)",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "git log --oneline",
          "out": "4f1a9c2 (HEAD -> main, origin/main) Initial import of scripts",
          "task": "t4"
        },
        { "cmd": "git remote -v", "out": "origin  git@git.lab:ops/scripts.git (fetch)\norigin  git@git.lab:ops/scripts.git (push)" },
        { "cmd": "show status", "out": "Git subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 16",
    "num": 16,
    "group": "AUTOMATION & SCRIPTING",
    "title": "Automating with Ansible Playbooks",
    "desc": "Repetitive server setup should be codified. You define an inventory, write a playbook task that installs and starts a package, check the syntax, and run it to confirm idempotent application across the hosts.",
    "objectives": [
      "Validate a playbook with a syntax check.",
      "Run a playbook to install and start a service.",
      "Confirm idempotency by inspecting the run recap."
    ],
    "console": {
      "host": "lab-ctl01",
      "boot": [
        "[SYS] Ansible control node online.",
        "[SYS] inventory.ini lists 3 managed web hosts."
      ],
      "tasks": [
        { "id": "t1", "label": "Run a playbook syntax check" },
        { "id": "t2", "label": "Apply the playbook to the web group" },
        { "id": "t3", "label": "Confirm the task is idempotent" },
        { "id": "t4", "label": "Verify connectivity to managed hosts" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Flag to validate playbook syntax without running",
          "options": ["--syntax-check", "--become", "--list-tags", "--start-at-task"],
          "correct": "--syntax-check",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Ansible module to install a package on RHEL",
          "options": ["ansible.builtin.dnf", "ansible.builtin.git", "ansible.builtin.debug", "ansible.builtin.uri"],
          "correct": "ansible.builtin.dnf",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "VERIFY MANAGED HOSTS",
        "placeholder": "ansible web -m ping",
        "button": "Run",
        "response": "[ANSIBLE] web1 | SUCCESS => {\"ping\": \"pong\"}\n[ANSIBLE] web2 | SUCCESS => {\"ping\": \"pong\"}\n[ANSIBLE] web3 | SUCCESS => {\"ping\": \"pong\"}",
        "task": "t4"
      },
      "commands": [
        {
          "cmd": "ansible-playbook site.yml",
          "out": "PLAY RECAP *********************************************************\nweb1 : ok=3  changed=0  unreachable=0  failed=0\nweb2 : ok=3  changed=0  unreachable=0  failed=0\nweb3 : ok=3  changed=0  unreachable=0  failed=0",
          "task": "t3"
        },
        {
          "cmd": "ansible-playbook site.yml --first-run",
          "out": "PLAY RECAP *********************************************************\nweb1 : ok=3  changed=2  unreachable=0  failed=0\nweb2 : ok=3  changed=2  unreachable=0  failed=0\nweb3 : ok=3  changed=2  unreachable=0  failed=0",
          "task": "t2"
        },
        { "cmd": "show status", "out": "Ansible subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 17",
    "num": 17,
    "group": "TROUBLESHOOTING",
    "title": "Diagnosing a Failed Boot (GRUB/fstab)",
    "desc": "A server drops to emergency mode after a bad fstab edit references a missing UUID. From the rescue prompt you identify the failing mount, correct the fstab entry, regenerate GRUB config, and confirm a clean boot target.",
    "objectives": [
      "Identify the failed mount causing emergency mode.",
      "Correct the offending /etc/fstab entry.",
      "Regenerate GRUB configuration and verify the boot."
    ],
    "console": {
      "host": "rescue",
      "boot": [
        "[SYS] Emergency shell online (rescue.target).",
        "[SYS] A start job for /data failed: device not found."
      ],
      "tasks": [
        { "id": "t1", "label": "Identify the failed mount unit" },
        { "id": "t2", "label": "Fix the bad fstab entry" },
        { "id": "t3", "label": "Regenerate the GRUB configuration" },
        { "id": "t4", "label": "Confirm the system reaches multi-user" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Option to make a mount non-fatal at boot",
          "options": ["nofail", "noauto only", "ro", "sync"],
          "correct": "nofail",
          "task": "t2"
        },
        {
          "id": "c2",
          "label": "Command to rebuild GRUB config on BIOS systems",
          "options": ["grub2-mkconfig -o /boot/grub2/grub.cfg", "grub2-install --reset", "mkinitrd --grub", "efibootmgr -c"],
          "correct": "grub2-mkconfig -o /boot/grub2/grub.cfg",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "INSPECT THE FAILED UNIT",
        "placeholder": "systemctl --failed",
        "button": "Run",
        "response": "[SYSTEMD] UNIT        LOAD   ACTIVE SUB    DESCRIPTION\n[SYSTEMD] data.mount   loaded failed failed Mount /data\n[SYSTEMD] 1 failed unit identified.",
        "task": "t1"
      },
      "commands": [
        {
          "cmd": "systemctl get-default && mount -a",
          "out": "multi-user.target\n(no errors; all fstab entries mounted)",
          "task": "t4"
        },
        { "cmd": "blkid", "out": "/dev/sda1: UUID=\"0a1b-2c3d\" TYPE=\"xfs\"\n/dev/sdb1: UUID=\"4e5f-6789\" TYPE=\"xfs\"" },
        { "cmd": "show status", "out": "Recovery subsystem nominal." }
      ]
    }
  },
  {
    "id": "Lab 18",
    "num": 18,
    "group": "TROUBLESHOOTING",
    "title": "Troubleshooting Network Connectivity",
    "desc": "Users report a host cannot reach the internet though the link is up. You work the stack from interface to DNS: confirm the address and route, test reachability, and identify a missing default gateway as the root cause.",
    "objectives": [
      "Confirm interface addressing and the routing table.",
      "Test layer-3 reachability and name resolution.",
      "Identify and correct the connectivity fault."
    ],
    "console": {
      "host": "lab-srv18",
      "boot": [
        "[SYS] Network triage console online.",
        "[SYS] ens33 is UP but external hosts are unreachable."
      ],
      "tasks": [
        { "id": "t1", "label": "Inspect interface addressing and routes" },
        { "id": "t2", "label": "Test reachability to the gateway and beyond" },
        { "id": "t3", "label": "Add the missing default route" },
        { "id": "t4", "label": "Verify name resolution now works" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command to view the kernel routing table",
          "options": ["ip route show", "ip link set down", "ethtool -r", "tcpdump -w"],
          "correct": "ip route show",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to add a default gateway",
          "options": ["ip route add default via 10.0.0.1", "ip addr flush dev ens33", "ip link delete ens33", "ip neigh flush all"],
          "correct": "ip route add default via 10.0.0.1",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "TEST REACHABILITY",
        "placeholder": "ping -c 3 10.0.0.1",
        "button": "Run",
        "response": "[NET] PING 10.0.0.1: 3 packets transmitted, 3 received, 0% loss\n[NET] gateway reachable; external still failing (no default route).",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "dig +short example.com",
          "out": "93.184.216.34",
          "task": "t4"
        },
        { "cmd": "ip route show", "out": "default via 10.0.0.1 dev ens33\n10.0.0.0/24 dev ens33 proto kernel scope link src 10.0.0.20" },
        { "cmd": "show status", "out": "Network triage nominal." }
      ]
    }
  },
  {
    "id": "Lab 19",
    "num": 19,
    "group": "TROUBLESHOOTING",
    "title": "Investigating High CPU and Memory",
    "desc": "A server is sluggish and the OOM killer has fired. You profile the system with top and free, pinpoint the runaway process, inspect memory pressure, and terminate the offender to restore responsiveness.",
    "objectives": [
      "Profile CPU and memory pressure on the system.",
      "Identify the process driving load and memory use.",
      "Terminate the offending process and confirm recovery."
    ],
    "console": {
      "host": "lab-srv19",
      "boot": [
        "[SYS] Performance triage console online.",
        "[SYS] Load average 24.10; OOM killer active."
      ],
      "tasks": [
        { "id": "t1", "label": "Inspect memory and swap usage" },
        { "id": "t2", "label": "Identify the top memory/CPU consumer" },
        { "id": "t3", "label": "Terminate the runaway process" },
        { "id": "t4", "label": "Confirm load and memory recovered" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command showing human-readable memory and swap",
          "options": ["free -h", "du -sh", "uptime -p", "vmstat -d"],
          "correct": "free -h",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Signal to forcibly terminate a hung process",
          "options": ["kill -9", "kill -1", "kill -18", "kill -0"],
          "correct": "kill -9",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "FIND THE TOP CONSUMER",
        "placeholder": "ps -eo pid,pmem,pcpu,comm --sort=-pmem | head",
        "button": "Run",
        "response": "[PS]   PID %MEM %CPU COMMAND\n[PS]  6620 71.4 96.2 leaky_app\n[PS]   911  1.0  0.3 sshd\n[PS] runaway identified: PID 6620 leaky_app.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "uptime",
          "out": " 11:42:09 up 7 days,  3:18,  2 users,  load average: 0.42, 1.10, 6.85",
          "task": "t4"
        },
        { "cmd": "free -h", "out": "              total        used        free      shared  buff/cache   available\nMem:           15Gi       3.1Gi       9.8Gi       210Mi       2.4Gi        11Gi\nSwap:         2.0Gi          0B       2.0Gi" },
        { "cmd": "show status", "out": "Performance triage nominal." }
      ]
    }
  },
  {
    "id": "Lab 20",
    "num": 20,
    "group": "TROUBLESHOOTING",
    "title": "Resolving Disk-Full and Permission Errors",
    "desc": "Writes are failing on a partition that reports full, and an app cannot access its log directory. You locate the space hog, free inodes and blocks, and correct ownership so the service can write again, confirming both fixes.",
    "objectives": [
      "Locate what is consuming disk space and inodes.",
      "Reclaim space by clearing large or stale files.",
      "Correct directory ownership and verify writes succeed."
    ],
    "console": {
      "host": "lab-srv20",
      "boot": [
        "[SYS] Storage triage console online.",
        "[SYS] /var at 100% used; app cannot write /var/log/app."
      ],
      "tasks": [
        { "id": "t1", "label": "Find the largest space consumers under /var" },
        { "id": "t2", "label": "Reclaim space from oversized logs" },
        { "id": "t3", "label": "Fix ownership on the app log directory" },
        { "id": "t4", "label": "Confirm free space and successful writes" }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command to find directory sizes sorted",
          "options": ["du -sh /var/* | sort -h", "df -i only", "ls -R /var", "stat -f /var"],
          "correct": "du -sh /var/* | sort -h",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Command to fix log directory ownership",
          "options": ["chown -R app:app /var/log/app", "chmod 000 /var/log/app", "rm -rf /var/log/app", "ln -s /var/log/app"],
          "correct": "chown -R app:app /var/log/app",
          "task": "t3"
        }
      ],
      "payload": {
        "label": "RECLAIM LOG SPACE",
        "placeholder": "truncate -s 0 /var/log/app/huge.log",
        "button": "Run",
        "response": "[DISK] /var/log/app/huge.log truncated from 12G to 0.\n[DISK] 12G freed on /var.",
        "task": "t2"
      },
      "commands": [
        {
          "cmd": "df -h /var && echo test > /var/log/app/probe && echo ok",
          "out": "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sdb1        20G  6.2G   14G  32% /var\nok",
          "task": "t4"
        },
        { "cmd": "du -sh /var/* | sort -h | tail -3", "out": "412M\t/var/cache\n1.1G\t/var/lib\n6.0G\t/var/log" },
        { "cmd": "show status", "out": "Storage triage nominal." }
      ]
    }
  }
];

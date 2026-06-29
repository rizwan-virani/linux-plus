window.TAXONOMY = [
  {
    title: 'Filesystem Hierarchy Standard',
    subtitle: 'Sort each file or path into the FHS directory where it belongs.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'etc', label: '/etc (configuration)' },
      { id: 'var', label: '/var (variable data)' },
      { id: 'bin', label: '/usr/bin (user binaries)' },
      { id: 'dev', label: '/dev (device files)' },
      { id: 'home', label: '/home (user data)' }
    ],
    items: [
      { text: 'fstab', cat: 'etc' },
      { text: 'sshd_config', cat: 'etc' },
      { text: 'passwd and shadow files', cat: 'etc' },
      { text: 'System log files in log/', cat: 'var' },
      { text: 'Print and mail spool queues', cat: 'var' },
      { text: 'cache/ for application data', cat: 'var' },
      { text: 'The grep executable', cat: 'bin' },
      { text: 'The vim editor binary', cat: 'bin' },
      { text: 'The awk command', cat: 'bin' },
      { text: 'sda block device node', cat: 'dev' },
      { text: 'null and zero pseudo-devices', cat: 'dev' },
      { text: 'tty terminal devices', cat: 'dev' },
      { text: "A user's .bashrc file", cat: 'home' },
      { text: 'Personal Documents directory', cat: 'home' },
      { text: 'SSH keys in .ssh/', cat: 'home' }
    ]
  },
  {
    title: 'Storage & LVM Command Layers',
    subtitle: 'Match each command to the LVM or filesystem layer it operates on.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'pv', label: 'Physical Volume' },
      { id: 'vg', label: 'Volume Group' },
      { id: 'lv', label: 'Logical Volume' },
      { id: 'fs', label: 'Filesystem' }
    ],
    items: [
      { text: 'pvcreate', cat: 'pv' },
      { text: 'pvs', cat: 'pv' },
      { text: 'pvdisplay', cat: 'pv' },
      { text: 'pvremove', cat: 'pv' },
      { text: 'vgcreate', cat: 'vg' },
      { text: 'vgextend', cat: 'vg' },
      { text: 'vgs', cat: 'vg' },
      { text: 'vgdisplay', cat: 'vg' },
      { text: 'lvcreate', cat: 'lv' },
      { text: 'lvextend', cat: 'lv' },
      { text: 'lvs', cat: 'lv' },
      { text: 'mkfs.xfs', cat: 'fs' },
      { text: 'resize2fs', cat: 'fs' },
      { text: 'xfs_growfs', cat: 'fs' },
      { text: 'mkfs.ext4', cat: 'fs' }
    ]
  },
  {
    title: 'Networking Tools by Function',
    subtitle: 'Sort each networking utility by the task it primarily performs.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'config', label: 'Configuration' },
      { id: 'conn', label: 'Connectivity Testing' },
      { id: 'dns', label: 'DNS / Name Resolution' },
      { id: 'traffic', label: 'Traffic Analysis' }
    ],
    items: [
      { text: 'nmcli', cat: 'config' },
      { text: 'ip addr add', cat: 'config' },
      { text: 'nmtui', cat: 'config' },
      { text: 'ethtool', cat: 'config' },
      { text: 'ping', cat: 'conn' },
      { text: 'mtr', cat: 'conn' },
      { text: 'traceroute', cat: 'conn' },
      { text: 'dig', cat: 'dns' },
      { text: 'nslookup', cat: 'dns' },
      { text: 'host', cat: 'dns' },
      { text: 'getent hosts', cat: 'dns' },
      { text: 'tcpdump', cat: 'traffic' },
      { text: 'ss -tunap', cat: 'traffic' },
      { text: 'wireshark capture', cat: 'traffic' }
    ]
  },
  {
    title: 'Permissions & Access Control',
    subtitle: 'Classify each command or concept by the access-control mechanism it uses.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'std', label: 'Standard Permissions' },
      { id: 'special', label: 'Special Permissions' },
      { id: 'acl', label: 'ACLs' },
      { id: 'selinux', label: 'SELinux' }
    ],
    items: [
      { text: 'chmod 644', cat: 'std' },
      { text: 'chown user:group', cat: 'std' },
      { text: 'umask 022', cat: 'std' },
      { text: 'chgrp', cat: 'std' },
      { text: 'setuid bit (chmod u+s)', cat: 'special' },
      { text: 'setgid bit (chmod g+s)', cat: 'special' },
      { text: 'sticky bit (chmod +t)', cat: 'special' },
      { text: 'setfacl -m u:alice:rw', cat: 'acl' },
      { text: 'getfacl', cat: 'acl' },
      { text: 'Default ACL with d: prefix', cat: 'acl' },
      { text: 'chcon -t httpd_sys_content_t', cat: 'selinux' },
      { text: 'semanage fcontext', cat: 'selinux' },
      { text: 'restorecon', cat: 'selinux' },
      { text: 'getenforce', cat: 'selinux' }
    ]
  },
  {
    title: 'systemd Unit Types',
    subtitle: 'Drag each unit into the systemd unit type its suffix indicates.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'service', label: 'Service' },
      { id: 'timer', label: 'Timer' },
      { id: 'mount', label: 'Mount' },
      { id: 'target', label: 'Target' }
    ],
    items: [
      { text: 'nginx.service', cat: 'service' },
      { text: 'sshd.service', cat: 'service' },
      { text: 'httpd.service', cat: 'service' },
      { text: 'crond.service', cat: 'service' },
      { text: 'backup.timer', cat: 'timer' },
      { text: 'logrotate.timer', cat: 'timer' },
      { text: 'fstrim.timer', cat: 'timer' },
      { text: 'data.mount', cat: 'mount' },
      { text: 'home.mount', cat: 'mount' },
      { text: 'srv-nfs.mount', cat: 'mount' },
      { text: 'multi-user.target', cat: 'target' },
      { text: 'graphical.target', cat: 'target' },
      { text: 'rescue.target', cat: 'target' },
      { text: 'network-online.target', cat: 'target' }
    ]
  },
  {
    title: 'Package Management by Distro Family',
    subtitle: 'Sort each package command into its distribution or ecosystem family.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'rpm', label: 'RPM family (dnf/yum/rpm)' },
      { id: 'deb', label: 'Debian family (apt/dpkg)' },
      { id: 'lang', label: 'Language-specific' }
    ],
    items: [
      { text: 'dnf install httpd', cat: 'rpm' },
      { text: 'yum update', cat: 'rpm' },
      { text: 'rpm -qa', cat: 'rpm' },
      { text: 'rpm -ivh package.rpm', cat: 'rpm' },
      { text: 'dnf groupinstall', cat: 'rpm' },
      { text: 'apt-get update', cat: 'deb' },
      { text: 'apt install nginx', cat: 'deb' },
      { text: 'dpkg -i package.deb', cat: 'deb' },
      { text: 'dpkg -l', cat: 'deb' },
      { text: 'apt-cache search', cat: 'deb' },
      { text: 'pip install requests', cat: 'lang' },
      { text: 'npm install express', cat: 'lang' },
      { text: 'cargo build', cat: 'lang' },
      { text: 'gem install bundler', cat: 'lang' }
    ]
  },
  {
    title: 'Firewall & Security Tooling',
    subtitle: 'Classify each command or tool by the firewall or security framework it belongs to.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'firewalld', label: 'firewalld' },
      { id: 'iptables', label: 'iptables / nftables' },
      { id: 'ufw', label: 'ufw' },
      { id: 'audit', label: 'Auditing / Compliance' }
    ],
    items: [
      { text: 'firewall-cmd --add-service=http', cat: 'firewalld' },
      { text: 'firewall-cmd --reload', cat: 'firewalld' },
      { text: 'firewall-cmd --list-all', cat: 'firewalld' },
      { text: 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT', cat: 'iptables' },
      { text: 'nft add rule inet filter input', cat: 'iptables' },
      { text: 'iptables -L -n', cat: 'iptables' },
      { text: 'nft list ruleset', cat: 'iptables' },
      { text: 'ufw allow 80/tcp', cat: 'ufw' },
      { text: 'ufw enable', cat: 'ufw' },
      { text: 'ufw status verbose', cat: 'ufw' },
      { text: 'auditctl -w /etc/passwd -p wa', cat: 'audit' },
      { text: 'oscap xccdf eval', cat: 'audit' },
      { text: 'aide --check', cat: 'audit' },
      { text: 'rkhunter --check', cat: 'audit' }
    ]
  },
  {
    title: 'Troubleshooting Tools by Subsystem',
    subtitle: 'Match each diagnostic tool to the subsystem you would use it to investigate.',
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: 'storage', label: 'Storage / OS' },
      { id: 'net', label: 'Networking' },
      { id: 'perf', label: 'Performance' },
      { id: 'sec', label: 'Security' }
    ],
    items: [
      { text: 'fsck', cat: 'storage' },
      { text: 'dmesg', cat: 'storage' },
      { text: 'journalctl -xe', cat: 'storage' },
      { text: 'lsblk', cat: 'storage' },
      { text: 'traceroute', cat: 'net' },
      { text: 'dig', cat: 'net' },
      { text: 'mtr', cat: 'net' },
      { text: 'ss -tuln', cat: 'net' },
      { text: 'top', cat: 'perf' },
      { text: 'iostat', cat: 'perf' },
      { text: 'vmstat', cat: 'perf' },
      { text: 'free -h', cat: 'perf' },
      { text: 'sealert', cat: 'sec' },
      { text: 'ausearch', cat: 'sec' },
      { text: 'aureport', cat: 'sec' }
    ]
  }
];

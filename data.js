/* All guide content lives here. Each main tab has sections (sub-tabs),
   each section has a short beginner intro, optional tips and command items.
   level: beginner | intermediate | advanced ; danger: true marks destructive commands. */
window.GUIDE = [
  {
    id: "linux",
    label: "Linux",
    icon: "🐧",
    intro: "Linux is controlled through a shell (usually bash or zsh). You type a command, press Enter, and the shell runs it. Most commands follow the pattern: command -options arguments.",
    sections: [
      {
        id: "start",
        label: "Getting Started",
        icon: "🚀",
        intro: "New to the terminal? Start here. These commands help you find out where you are, move around, and get help when you're stuck.",
        tips: [
          "Press <kbd>Tab</kbd> to auto-complete file and command names.",
          "Press <kbd>↑</kbd> / <kbd>↓</kbd> to scroll through previous commands.",
          "Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop a running command.",
          "<code>~</code> means your home folder, <code>.</code> is the current folder, <code>..</code> is the parent folder."
        ],
        items: [
          { cmd: "pwd", desc: "Print the folder you are currently in (print working directory).", ex: "pwd", out: "/home/alex", level: "beginner" },
          { cmd: "ls", desc: "List files and folders. -l shows details, -a shows hidden files, -h makes sizes readable.", ex: "ls -lah", level: "beginner" },
          { cmd: "cd", desc: "Change directory. Use cd .. to go up, cd ~ or just cd to go home, cd - to go back.", ex: "cd ~/Documents\ncd ..\ncd -", level: "beginner" },
          { cmd: "man", desc: "Open the manual page for any command. Press q to quit, / to search.", ex: "man ls", level: "beginner" },
          { cmd: "--help", desc: "Most commands print a short usage summary with --help.", ex: "cp --help", level: "beginner" },
          { cmd: "clear", desc: "Clear the terminal screen (or press Ctrl+L).", ex: "clear", level: "beginner" },
          { cmd: "history", desc: "Show previously run commands. Re-run one with !number.", ex: "history | tail -20\n!42", level: "beginner" },
          { cmd: "history editing", desc: "Navigate and edit past commands. ↑ / ↓ scroll through history. Ctrl+R opens a reverse search — keep typing to narrow it down, press Ctrl+R again for the next match, then → or End to land on the command and edit it before running. fc opens the last command in your $EDITOR so you can rewrite it fully, then save & quit to execute. history -d removes a single entry; HISTCONTROL stops duplicates from piling up.", ex: "# Reverse search (most useful shortcut)\n# Press Ctrl+R, then type part of the command\n(reverse-i-search)`ssh': ssh user@server\n\n# Edit last command in your editor, then run it\nfc\n\n# Edit a specific history entry by number\nfc 42\n\n# Re-run last command\n!!\n\n# Re-run last command starting with 'git'\n!git\n\n# Delete entry 42 from history\nhistory -d 42\n\n# Don't save duplicate commands in history\nexport HISTCONTROL=ignoredups", level: "beginner" },
          { cmd: "echo", desc: "Print text or the value of a variable.", ex: "echo \"Hello\"\necho $HOME", level: "beginner" },
          { cmd: "which / type", desc: "Show where a command lives or what kind of command it is.", ex: "which python3\ntype ls", level: "beginner" },
          { cmd: "whoami", desc: "Print the current user name.", ex: "whoami", level: "beginner" }
        ]
      },
      {
        id: "files",
        label: "Files & Data Transfer",
        icon: "📁",
        intro: "Create, copy, move, rename and delete files and folders — locally and between machines. Linux won't ask \"are you sure?\" by default, so be careful with rm and with mv/cp overwriting files.",
        tips: [
          "Add <code>-i</code> to cp, mv and rm to be asked before overwriting or deleting.",
          "There is no Recycle Bin in the terminal: <code>rm</code> is permanent.",
          "Wrap file names with spaces in quotes: <code>\"my file.txt\"</code>."
        ],
        items: [
          { cmd: "touch", desc: "Create an empty file, or update a file's timestamp.", ex: "touch notes.txt", level: "beginner" },
          { cmd: "mkdir", desc: "Create a folder. -p creates parent folders as needed.", ex: "mkdir projects\nmkdir -p projects/app/src", level: "beginner" },
          { cmd: "cp", desc: "Copy files. Use -r to copy folders, -i to confirm overwrites, -v to see what happens.", ex: "cp report.txt backup.txt\ncp -r photos/ /mnt/usb/photos/", level: "beginner" },
          { cmd: "mv", desc: "Move or rename files and folders.", ex: "mv old.txt new.txt\nmv *.jpg ~/Pictures/", level: "beginner" },
          { cmd: "rm", desc: "Delete files permanently. -r deletes folders and their contents, -f forces without asking.", ex: "rm file.txt\nrm -i *.log\nrm -r old_folder/", level: "beginner", danger: true },
          { cmd: "rmdir", desc: "Remove an empty folder (safer than rm -r).", ex: "rmdir empty_folder", level: "beginner" },
          { cmd: "ln -s", desc: "Create a symbolic link (shortcut) to a file or folder.", ex: "ln -s /var/www/html ~/site", level: "intermediate" },
          { cmd: "rsync", desc: "Smart copy/sync that only transfers changes. Great for backups and remote copies.", ex: "rsync -avh --progress src/ backup/\nrsync -avz project/ user@server:/home/user/project/", level: "intermediate" },
          { cmd: "scp", desc: "Securely copy files to or from another machine over SSH.", ex: "scp file.txt user@server:/tmp/\nscp user@server:/var/log/app.log .\nscp -r folder/ user@server:~/", level: "intermediate" },
          { cmd: "sftp", desc: "Interactive secure file transfer session (put, get, ls, cd).", ex: "sftp user@server\nsftp> put local.txt\nsftp> get remote.txt", level: "intermediate" },
          { cmd: "wget", desc: "Download a file from the web.", ex: "wget https://example.com/file.zip", level: "beginner" },
          { cmd: "curl", desc: "Transfer data to/from URLs. -O saves with the remote name, -L follows redirects.", ex: "curl -LO https://example.com/file.zip\ncurl https://api.github.com", level: "intermediate" },
          { cmd: "dd", desc: "Low-level copy of disks/images (e.g. writing an ISO to a USB stick). Wrong of= can wipe a disk!", ex: "sudo dd if=ubuntu.iso of=/dev/sdX bs=4M status=progress", level: "advanced", danger: true },
          { cmd: "shred", desc: "Overwrite a file to make it unrecoverable, then delete it with -u.", ex: "shred -u secret.txt", level: "advanced", danger: true }
        ]
      },
      {
        id: "view",
        label: "Viewing & Editing",
        icon: "📝",
        intro: "Look inside files without opening a heavy editor, and edit text right in the terminal.",
        tips: [
          "In <code>less</code>: Space = next page, b = back, /word = search, q = quit.",
          "In <code>nano</code>: Ctrl+O saves, Ctrl+X exits.",
          "In <code>vim</code>: press i to type, Esc then :wq to save & quit, :q! to quit without saving."
        ],
        items: [
          { cmd: "cat", desc: "Print a whole file to the screen. Also joins files together.", ex: "cat notes.txt\ncat a.txt b.txt > both.txt", level: "beginner" },
          { cmd: "less", desc: "Scroll through a file page by page.", ex: "less /var/log/syslog", level: "beginner" },
          { cmd: "head / tail", desc: "Show the first or last lines of a file. tail -f follows a file live (great for logs).", ex: "head -n 20 data.csv\ntail -f /var/log/syslog", level: "beginner" },
          { cmd: "nano", desc: "Simple, beginner-friendly terminal text editor.", ex: "nano notes.txt", level: "beginner" },
          { cmd: "vim", desc: "Powerful modal editor available on almost every server.", ex: "vim config.yaml", level: "intermediate" },
          { cmd: "wc", desc: "Count lines, words and characters.", ex: "wc -l data.csv", level: "beginner" },
          { cmd: "diff", desc: "Show differences between two files.", ex: "diff -u old.conf new.conf", level: "intermediate" },
          { cmd: "file", desc: "Detect what kind of file something is.", ex: "file mystery.bin", level: "beginner" }
        ]
      },
      {
        id: "search",
        label: "Search & Text",
        icon: "🔍",
        intro: "Find files by name and find text inside files. Combine commands with pipes (|) to build powerful one-liners.",
        tips: [
          "<code>|</code> (pipe) sends the output of one command into the next.",
          "<code>&gt;</code> writes output to a file (overwrites), <code>&gt;&gt;</code> appends.",
          "<code>*</code> matches anything: <code>*.txt</code> means every .txt file."
        ],
        items: [
          { cmd: "find", desc: "Search for files by name, type, size or age.", ex: "find . -name \"*.py\"\nfind /var/log -size +100M\nfind . -mtime -7 -type f", level: "intermediate" },
          { cmd: "grep", desc: "Search for text inside files. -r recursive, -i ignore case, -n show line numbers.", ex: "grep -rin \"error\" /var/log/\nps aux | grep python", level: "beginner" },
          { cmd: "locate", desc: "Very fast file-name search using a prebuilt database (run sudo updatedb first).", ex: "locate nginx.conf", level: "intermediate" },
          { cmd: "sort / uniq", desc: "Sort lines and remove or count duplicates.", ex: "sort names.txt | uniq -c | sort -nr", level: "intermediate" },
          { cmd: "cut", desc: "Extract columns from text.", ex: "cut -d',' -f1,3 data.csv", level: "intermediate" },
          { cmd: "sed", desc: "Stream editor — find & replace text.", ex: "sed 's/old/new/g' file.txt\nsed -i 's/http:/https:/g' links.txt", level: "advanced" },
          { cmd: "awk", desc: "Pattern scanning and column processing language.", ex: "awk '{print $1, $3}' access.log\nawk -F, '$3 > 100' data.csv", level: "advanced" },
          { cmd: "xargs", desc: "Turn input lines into arguments for another command.", ex: "find . -name \"*.tmp\" | xargs rm", level: "advanced", danger: true },
          { cmd: "tee", desc: "Write output to a file and the screen at the same time.", ex: "ls -l | tee listing.txt", level: "intermediate" }
        ]
      },
      {
        id: "perms",
        label: "Permissions & Users",
        icon: "🔐",
        intro: "Every file has an owner, a group and permissions: read (r=4), write (w=2) and execute (x=1) for user, group and others. sudo runs a command as the administrator (root).",
        tips: [
          "<code>ls -l</code> shows permissions like <code>-rwxr-xr--</code>.",
          "<code>chmod 755</code> = owner rwx, group r-x, others r-x.",
          "Use <code>sudo</code> only when needed — root can break anything."
        ],
        items: [
          { cmd: "chmod", desc: "Change file permissions using numbers or letters.", ex: "chmod +x script.sh\nchmod 644 index.html\nchmod -R 755 public/", level: "beginner" },
          { cmd: "chown", desc: "Change file owner and group.", ex: "sudo chown alex:alex file.txt\nsudo chown -R www-data:www-data /var/www", level: "intermediate" },
          { cmd: "sudo", desc: "Run a command with administrator privileges.", ex: "sudo apt update\nsudo -i", level: "beginner" },
          { cmd: "su", desc: "Switch to another user (default root).", ex: "su - alex", level: "intermediate" },
          { cmd: "useradd / adduser", desc: "Create a new user (adduser is the friendlier interactive version on Debian/Ubuntu).", ex: "sudo adduser maria", level: "intermediate" },
          { cmd: "usermod", desc: "Modify a user, e.g. add them to a group.", ex: "sudo usermod -aG sudo maria\nsudo usermod -aG docker $USER", level: "intermediate" },
          { cmd: "passwd", desc: "Change your password (or another user's with sudo).", ex: "passwd\nsudo passwd maria", level: "beginner" },
          { cmd: "id / groups", desc: "Show your user ID and the groups you belong to.", ex: "id\ngroups", level: "beginner" },
          { cmd: "userdel", desc: "Delete a user. -r also removes their home folder.", ex: "sudo userdel -r olduser", level: "advanced", danger: true }
        ]
      },
      {
        id: "system",
        label: "System Configuration",
        icon: "⚙️",
        intro: "Inspect your machine, manage services, and configure things like hostname, time and environment variables. Most changes here need sudo.",
        tips: [
          "System-wide config files live in <code>/etc</code>.",
          "Your personal shell config is <code>~/.bashrc</code> (or <code>~/.zshrc</code>). Reload with <code>source ~/.bashrc</code>.",
          "Logs live in <code>/var/log</code> or are viewed with <code>journalctl</code>."
        ],
        items: [
          { cmd: "uname", desc: "Show kernel and OS information.", ex: "uname -a", level: "beginner" },
          { cmd: "cat /etc/os-release", desc: "Show which Linux distribution and version you're running.", ex: "cat /etc/os-release", level: "beginner" },
          { cmd: "hostnamectl", desc: "View or set the machine's hostname.", ex: "hostnamectl\nsudo hostnamectl set-hostname my-server", level: "intermediate" },
          { cmd: "timedatectl", desc: "View or set date, time and timezone.", ex: "timedatectl\nsudo timedatectl set-timezone Europe/Berlin", level: "intermediate" },
          { cmd: "systemctl", desc: "Start, stop, restart, enable and check services (systemd).", ex: "systemctl status nginx\nsudo systemctl restart nginx\nsudo systemctl enable --now ssh", level: "intermediate" },
          { cmd: "journalctl", desc: "Read system and service logs.", ex: "journalctl -u nginx --since today\njournalctl -f", level: "intermediate" },
          { cmd: "export", desc: "Set an environment variable for the current session. Add to ~/.bashrc to make it permanent.", ex: "export EDITOR=nano\necho 'export PATH=\"$HOME/bin:$PATH\"' >> ~/.bashrc", level: "intermediate" },
          { cmd: "env / printenv", desc: "List environment variables.", ex: "printenv PATH", level: "beginner" },
          { cmd: "alias", desc: "Create a shortcut for a long command.", ex: "alias ll='ls -lah'\nalias gs='git status'", level: "beginner" },
          { cmd: "crontab", desc: "Schedule commands to run automatically. Format: min hour day month weekday command.", ex: "crontab -e\n# every day at 2:30\n30 2 * * * /home/alex/backup.sh", level: "intermediate" },
          { cmd: "uptime", desc: "How long the system has been running and the load average.", ex: "uptime", level: "beginner" },
          { cmd: "free", desc: "Show memory (RAM) usage.", ex: "free -h", level: "beginner" },
          { cmd: "lscpu / lsblk / lsusb", desc: "List CPU details, block devices (disks) and USB devices.", ex: "lscpu\nlsblk\nlsusb", level: "beginner" },
          { cmd: "reboot / shutdown", desc: "Restart or power off the machine.", ex: "sudo reboot\nsudo shutdown -h now\nsudo shutdown -r +10", level: "beginner", danger: true },
          { cmd: "XQuartz font size", desc: "Change the terminal font size in XQuartz (macOS X11). Edit ~/.Xresources to set a persistent size, then apply with xrdb. Restart xterm to see the change. You can also right-click inside an xterm window and choose VT Fonts → Huge/Large/Medium/Small for a quick one-off change.", ex: "# 1. Edit ~/.Xresources (create if it doesn't exist)\necho 'XTerm*faceSize: 14' >> ~/.Xresources\necho 'XTerm*faceName: Menlo' >> ~/.Xresources\n\n# 2. Apply the settings\nxrdb -merge ~/.Xresources\n\n# 3. Open a new xterm to see the change\nxterm &", out: "# To verify current settings:\nxrdb -query | grep -i xterm", level: "beginner" },

        ]
      },
      {
        id: "proc",
        label: "Processes",
        icon: "📊",
        intro: "Every running program is a process with an ID (PID). Watch what's using your CPU and memory, and stop programs that misbehave.",
        tips: [
          "Add <code>&amp;</code> at the end of a command to run it in the background.",
          "<code>Ctrl</code>+<code>Z</code> pauses a program; <code>bg</code> resumes it in the background, <code>fg</code> brings it back."
        ],
        items: [
          { cmd: "ps", desc: "List running processes.", ex: "ps aux\nps aux | grep nginx", level: "beginner" },
          { cmd: "top / htop", desc: "Live view of processes and resource usage. htop is friendlier (may need installing). Press q to quit.", ex: "top\nhtop", level: "beginner" },
          { cmd: "kill", desc: "Send a signal to a process by PID. Default asks politely (TERM); -9 forces.", ex: "kill 1234\nkill -9 1234", level: "intermediate", danger: true },
          { cmd: "pkill / killall", desc: "Kill processes by name. Be sure the name matches only what you intend.", ex: "pkill firefox", level: "intermediate", danger: true },
          { cmd: "jobs / bg / fg", desc: "Manage background jobs in your current shell.", ex: "sleep 100 &\njobs\nfg %1", level: "intermediate" },
          { cmd: "nohup", desc: "Keep a command running after you log out.", ex: "nohup python3 server.py > out.log 2>&1 &", level: "intermediate" },
          { cmd: "nice / renice", desc: "Run a process with lower/higher priority.", ex: "nice -n 10 ./heavy_task.sh\nsudo renice -n 5 -p 1234", level: "advanced" }
        ]
      },
      {
        id: "net",
        label: "Networking",
        icon: "🌐",
        intro: "Check your connection, find your IP address, test if a server responds and connect to remote machines.",
        items: [
          { cmd: "ip a", desc: "Show network interfaces and IP addresses.", ex: "ip a\nip route", level: "beginner" },
          { cmd: "ping", desc: "Test whether a host is reachable. Ctrl+C to stop.", ex: "ping -c 4 google.com", level: "beginner" },
          { cmd: "ssh", desc: "Log in to a remote machine securely.", ex: "ssh user@192.168.1.10\nssh -p 2222 user@server", level: "beginner" },
          { cmd: "ssh-keygen / ssh-copy-id", desc: "Create an SSH key pair and install it on a server for password-less login.", ex: "ssh-keygen -t ed25519\nssh-copy-id user@server", level: "intermediate" },
          { cmd: "ss", desc: "Show open ports and connections (modern replacement for netstat).", ex: "ss -tulpn", level: "intermediate" },
          { cmd: "dig / nslookup", desc: "Look up DNS records for a domain.", ex: "dig example.com\nnslookup example.com", level: "intermediate" },
          { cmd: "traceroute", desc: "Show the route packets take to a host.", ex: "traceroute example.com", level: "intermediate" },
          { cmd: "ufw", desc: "Simple firewall (Ubuntu). Allow SSH before enabling!", ex: "sudo ufw allow OpenSSH\nsudo ufw enable\nsudo ufw status", level: "intermediate", danger: true }
        ]
      },
      {
        id: "pkg",
        label: "Packages",
        icon: "📦",
        intro: "Install, update and remove software with your distribution's package manager. Debian/Ubuntu use apt, Fedora/RHEL use dnf, Arch uses pacman.",
        items: [
          { cmd: "apt update / upgrade", desc: "Refresh the package list, then upgrade installed packages (Debian/Ubuntu).", ex: "sudo apt update && sudo apt upgrade", level: "beginner" },
          { cmd: "apt install / remove", desc: "Install or remove a package.", ex: "sudo apt install htop\nsudo apt remove htop", level: "beginner" },
          { cmd: "apt search / show", desc: "Search for packages and see details.", ex: "apt search image editor\napt show git", level: "beginner" },
          { cmd: "dnf", desc: "Package manager for Fedora / RHEL / CentOS.", ex: "sudo dnf install git\nsudo dnf upgrade", level: "beginner" },
          { cmd: "pacman", desc: "Package manager for Arch Linux.", ex: "sudo pacman -Syu\nsudo pacman -S git", level: "intermediate" },
          { cmd: "snap / flatpak", desc: "Universal app packages that work across distributions.", ex: "sudo snap install code --classic\nflatpak install flathub org.gimp.GIMP", level: "intermediate" },
          { cmd: "apt autoremove", desc: "Remove packages that are no longer needed.", ex: "sudo apt autoremove", level: "beginner" }
        ]
      },
      {
        id: "disk",
        label: "Disk & Archives",
        icon: "💾",
        intro: "Check disk space, see what's taking up room, mount drives, and pack/unpack archives like .tar.gz and .zip.",
        tips: [
          "tar flags: <code>c</code> create, <code>x</code> extract, <code>z</code> gzip, <code>v</code> verbose, <code>f</code> file name.",
          "Memory trick: e<b>X</b>tract <b>Z</b>e <b>V</b>ery <b>F</b>ile → <code>tar xzvf</code>."
        ],
        items: [
          { cmd: "df", desc: "Show free space on each mounted disk.", ex: "df -h", level: "beginner" },
          { cmd: "du", desc: "Show how much space folders use.", ex: "du -sh *\ndu -h --max-depth=1 / | sort -h", level: "beginner" },
          { cmd: "mount / umount", desc: "Attach or detach a drive to a folder.", ex: "sudo mount /dev/sdb1 /mnt/usb\nsudo umount /mnt/usb", level: "intermediate" },
          { cmd: "tar", desc: "Create or extract .tar / .tar.gz archives.", ex: "tar -czvf backup.tar.gz project/\ntar -xzvf backup.tar.gz\ntar -tzvf backup.tar.gz", level: "beginner" },
          { cmd: "zip / unzip", desc: "Create or extract .zip files.", ex: "zip -r site.zip site/\nunzip site.zip -d site/", level: "beginner" },
          { cmd: "gzip / gunzip", desc: "Compress or decompress a single file.", ex: "gzip big.log\ngunzip big.log.gz", level: "beginner" },
          { cmd: "fdisk / parted", desc: "Partition disks. Mistakes erase data!", ex: "sudo fdisk -l", level: "advanced", danger: true },
          { cmd: "mkfs", desc: "Format a partition with a filesystem. Erases everything on it.", ex: "sudo mkfs.ext4 /dev/sdb1", level: "advanced", danger: true }
        ]
      }
    ]
  },
  {
    id: "python",
    label: "Python",
    icon: "🐍",
    intro: "Python is a readable, beginner-friendly programming language. You can run it interactively by typing python3 in the terminal, or save code in a .py file and run python3 file.py.",
    sections: [
      {
        id: "pstart",
        label: "Getting Started",
        icon: "🚀",
        intro: "Run Python, print things, and store values in variables. Indentation (spaces at the start of a line) matters in Python — use 4 spaces.",
        tips: [
          "Lines starting with <code>#</code> are comments and are ignored.",
          "Type <code>exit()</code> or press <kbd>Ctrl</kbd>+<kbd>D</kbd> to leave the interactive shell.",
          "Use <code>help(thing)</code> or <code>dir(thing)</code> to explore anything."
        ],
        items: [
          { cmd: "python3", desc: "Start the interactive Python shell (REPL), or run a script.", ex: "python3\npython3 hello.py\npython3 --version", level: "beginner", lang: "bash" },
          { cmd: "print()", desc: "Show output on the screen.", ex: "print(\"Hello, world!\")\nprint(\"a\", \"b\", sep=\"-\")", out: "Hello, world!\na-b", level: "beginner" },
          { cmd: "variables", desc: "Store values with =. No type declaration needed.", ex: "name = \"Alex\"\nage = 30\npi = 3.14\nis_admin = False", level: "beginner" },
          { cmd: "input()", desc: "Ask the user for text (always returns a string).", ex: "name = input(\"Your name: \")\nage = int(input(\"Age: \"))", level: "beginner" },
          { cmd: "f-strings", desc: "Insert values into text with f\"...{value}...\".", ex: "name = \"Alex\"\nprint(f\"Hi {name}, 2+2={2+2}\")\nprint(f\"{3.14159:.2f}\")", out: "Hi Alex, 2+2=4\n3.14", level: "beginner" },
          { cmd: "type() / help()", desc: "Find out what type a value is, or read its documentation.", ex: "type(42)\nhelp(str.split)", level: "beginner" },
          { cmd: "operators", desc: "Math and comparison operators.", ex: "7 + 2, 7 - 2, 7 * 2, 7 / 2   # 9 5 14 3.5\n7 // 2, 7 % 2, 7 ** 2       # 3 1 49\n3 == 3, 3 != 4, 3 < 5       # True True True", level: "beginner" }
        ]
      },
      {
        id: "types",
        label: "Data Types",
        icon: "🧱",
        intro: "Python's core building blocks: numbers, strings, lists, tuples, dictionaries and sets.",
        items: [
          { cmd: "str", desc: "Text. Use single or double quotes; triple quotes for multi-line.", ex: "s = \"Hello\"\ns.upper()        # 'HELLO'\ns.lower()        # 'hello'\ns.replace(\"l\", \"L\")\n\" a b \".strip()  # 'a b'\n\"a,b,c\".split(\",\")  # ['a','b','c']\n\"-\".join([\"a\", \"b\"])  # 'a-b'", level: "beginner" },
          { cmd: "slicing", desc: "Get parts of strings/lists with [start:stop:step]. Index starts at 0.", ex: "s = \"Python\"\ns[0]     # 'P'\ns[-1]    # 'n'\ns[0:3]   # 'Pyt'\ns[::-1]  # 'nohtyP'", level: "beginner" },
          { cmd: "int / float / bool", desc: "Numbers and True/False. Convert between types with int(), float(), str().", ex: "int(\"42\")     # 42\nfloat(\"3.5\")  # 3.5\nstr(10)       # '10'\nbool(0)       # False", level: "beginner" },
          { cmd: "list", desc: "Ordered, changeable collection.", ex: "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")\nfruits.insert(0, \"kiwi\")\nfruits.remove(\"banana\")\nfruits.pop()\nlen(fruits)\nsorted(fruits)", level: "beginner" },
          { cmd: "tuple", desc: "Ordered, unchangeable collection. Great for fixed groups of values.", ex: "point = (3, 4)\nx, y = point", level: "beginner" },
          { cmd: "dict", desc: "Key → value pairs.", ex: "user = {\"name\": \"Alex\", \"age\": 30}\nuser[\"age\"]\nuser.get(\"email\", \"none\")\nuser[\"email\"] = \"a@b.com\"\nfor key, value in user.items():\n    print(key, value)", level: "beginner" },
          { cmd: "set", desc: "Unordered collection of unique values.", ex: "tags = {\"a\", \"b\", \"a\"}   # {'a', 'b'}\ntags.add(\"c\")\n{1, 2} | {2, 3}  # union {1, 2, 3}\n{1, 2} & {2, 3}  # intersection {2}", level: "intermediate" },
          { cmd: "None", desc: "Represents 'no value'. Check with is None.", ex: "result = None\nif result is None:\n    print(\"nothing yet\")", level: "beginner" }
        ]
      },
      {
        id: "flow",
        label: "Control Flow",
        icon: "🔀",
        intro: "Make decisions with if, repeat work with for and while loops. The indented block belongs to the line ending with a colon (:).",
        items: [
          { cmd: "if / elif / else", desc: "Run code only when a condition is true.", ex: "if age >= 18:\n    print(\"adult\")\nelif age >= 13:\n    print(\"teen\")\nelse:\n    print(\"child\")", level: "beginner" },
          { cmd: "for", desc: "Loop over items in a list, string, range, etc.", ex: "for fruit in [\"apple\", \"kiwi\"]:\n    print(fruit)\n\nfor i in range(5):   # 0..4\n    print(i)", level: "beginner" },
          { cmd: "while", desc: "Repeat while a condition stays true.", ex: "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1", level: "beginner" },
          { cmd: "break / continue", desc: "Exit a loop early, or skip to the next iteration.", ex: "for n in range(10):\n    if n == 5:\n        break\n    if n % 2 == 0:\n        continue\n    print(n)   # 1 3", level: "beginner" },
          { cmd: "enumerate / zip", desc: "Loop with an index, or over two lists side by side.", ex: "for i, name in enumerate([\"a\", \"b\"]):\n    print(i, name)\n\nfor name, age in zip(names, ages):\n    print(name, age)", level: "intermediate" },
          { cmd: "comprehensions", desc: "Build lists/dicts in one readable line.", ex: "squares = [x * x for x in range(5)]\nevens = [x for x in nums if x % 2 == 0]\nlengths = {w: len(w) for w in words}", level: "intermediate" },
          { cmd: "match", desc: "Structural pattern matching (Python 3.10+).", ex: "match command:\n    case \"start\":\n        run()\n    case \"stop\" | \"quit\":\n        stop()\n    case _:\n        print(\"unknown\")", level: "advanced" }
        ]
      },
      {
        id: "func",
        label: "Functions",
        icon: "🧩",
        intro: "Functions package reusable code. Define with def, give inputs as parameters, and send a result back with return.",
        items: [
          { cmd: "def", desc: "Define a function.", ex: "def greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Alex\"))", level: "beginner" },
          { cmd: "default arguments", desc: "Give parameters a default value.", ex: "def power(base, exp=2):\n    return base ** exp\n\npower(3)      # 9\npower(2, 5)   # 32", level: "beginner" },
          { cmd: "*args / **kwargs", desc: "Accept any number of positional or keyword arguments.", ex: "def show(*args, **kwargs):\n    print(args, kwargs)\n\nshow(1, 2, color=\"red\")", out: "(1, 2) {'color': 'red'}", level: "intermediate" },
          { cmd: "lambda", desc: "Small anonymous function, often used with sorted/map/filter.", ex: "people.sort(key=lambda p: p[\"age\"])\ndouble = lambda x: x * 2", level: "intermediate" },
          { cmd: "type hints", desc: "Document expected types (not enforced at runtime).", ex: "def add(a: int, b: int) -> int:\n    return a + b", level: "intermediate" },
          { cmd: "built-ins", desc: "Handy functions always available.", ex: "len([1, 2, 3])   # 3\nsum([1, 2, 3])   # 6\nmax(4, 9, 2)     # 9\nmin([4, 9, 2])   # 2\nabs(-5)          # 5\nround(3.567, 1)  # 3.6\nany([0, 1]), all([0, 1])  # True False", level: "beginner" },
          { cmd: "if __name__ == \"__main__\"", desc: "Run code only when the file is executed directly, not when imported.", ex: "def main():\n    print(\"running\")\n\nif __name__ == \"__main__\":\n    main()", level: "intermediate" }
        ]
      },
      {
        id: "fileio",
        label: "Files & Errors",
        icon: "📄",
        intro: "Read and write files safely with with open(...), and handle problems gracefully using try/except instead of crashing.",
        tips: [
          "File modes: <code>\"r\"</code> read, <code>\"w\"</code> write (overwrites!), <code>\"a\"</code> append, <code>\"b\"</code> binary.",
          "<code>with</code> closes the file for you automatically."
        ],
        items: [
          { cmd: "read a file", desc: "Read the whole file or loop line by line.", ex: "with open(\"notes.txt\") as f:\n    text = f.read()\n\nwith open(\"notes.txt\") as f:\n    for line in f:\n        print(line.strip())", level: "beginner" },
          { cmd: "write a file", desc: "Write text. \"w\" replaces existing content, \"a\" appends.", ex: "with open(\"out.txt\", \"w\") as f:\n    f.write(\"Hello\\n\")\n\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"new entry\\n\")", level: "beginner", danger: true },
          { cmd: "pathlib", desc: "Modern, object-oriented file paths.", ex: "from pathlib import Path\np = Path(\"data\") / \"report.txt\"\np.exists()\np.read_text()\nfor f in Path(\".\").glob(\"*.py\"):\n    print(f.name)", level: "intermediate" },
          { cmd: "json", desc: "Read and write JSON data.", ex: "import json\nwith open(\"data.json\") as f:\n    data = json.load(f)\nwith open(\"out.json\", \"w\") as f:\n    json.dump(data, f, indent=2)", level: "intermediate" },
          { cmd: "csv", desc: "Read and write CSV spreadsheets.", ex: "import csv\nwith open(\"data.csv\", newline=\"\") as f:\n    for row in csv.DictReader(f):\n        print(row[\"name\"])", level: "intermediate" },
          { cmd: "try / except", desc: "Catch errors and handle them.", ex: "try:\n    n = int(input(\"Number: \"))\nexcept ValueError:\n    print(\"That's not a number\")\nelse:\n    print(\"ok\", n)\nfinally:\n    print(\"done\")", level: "beginner" },
          { cmd: "raise", desc: "Signal an error yourself.", ex: "if age < 0:\n    raise ValueError(\"age must be positive\")", level: "intermediate" }
        ]
      },
      {
        id: "oop",
        label: "Classes & OOP",
        icon: "🏗️",
        intro: "Classes bundle data (attributes) and behaviour (methods) together. Create objects (instances) from a class like cookies from a cutter.",
        items: [
          { cmd: "class", desc: "Define a class with an __init__ constructor.", ex: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f\"{self.name} says woof\"\n\nrex = Dog(\"Rex\")\nprint(rex.bark())", level: "intermediate" },
          { cmd: "inheritance", desc: "Create a class that extends another.", ex: "class Puppy(Dog):\n    def bark(self):\n        return super().bark() + \" (tiny)\"", level: "intermediate" },
          { cmd: "__str__ / __repr__", desc: "Control how an object prints.", ex: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"", level: "intermediate" },
          { cmd: "@dataclass", desc: "Auto-generate __init__, __repr__ and comparisons.", ex: "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    name: str\n    age: int = 0\n\nUser(\"Alex\", 30)", level: "advanced" },
          { cmd: "@property", desc: "Access a method like an attribute.", ex: "class Circle:\n    def __init__(self, r):\n        self.r = r\n    @property\n    def area(self):\n        return 3.14159 * self.r ** 2", level: "advanced" }
        ]
      },
      {
        id: "env",
        label: "pip & Virtual Envs",
        icon: "🧪",
        intro: "Install third-party packages with pip, and keep each project's packages separate with a virtual environment (venv). These run in the terminal, not inside Python.",
        tips: [
          "Always activate your venv before running <code>pip install</code>.",
          "Your prompt shows <code>(.venv)</code> when the environment is active."
        ],
        items: [
          { cmd: "python3 -m venv", desc: "Create a virtual environment in a folder called .venv.", ex: "python3 -m venv .venv", level: "beginner", lang: "bash" },
          { cmd: "activate / deactivate", desc: "Turn the virtual environment on or off.", ex: "source .venv/bin/activate      # Linux/macOS\n.venv\\Scripts\\activate         # Windows\ndeactivate", level: "beginner", lang: "bash" },
          { cmd: "pip install", desc: "Install a package (optionally a specific version).", ex: "pip install requests\npip install \"django==5.0\"\npip install -U requests", level: "beginner", lang: "bash" },
          { cmd: "requirements.txt", desc: "Save and restore your project's package list.", ex: "pip freeze > requirements.txt\npip install -r requirements.txt", level: "beginner", lang: "bash" },
          { cmd: "pip list / show / uninstall", desc: "See installed packages, details, or remove one.", ex: "pip list\npip show requests\npip uninstall requests", level: "beginner", lang: "bash" },
          { cmd: "python3 -m", desc: "Run a module as a script — handy built-in tools.", ex: "python3 -m http.server 8000   # serve current folder\npython3 -m json.tool data.json # pretty-print JSON\npython3 -m pip --version", level: "intermediate", lang: "bash" }
        ]
      },
      {
        id: "stdlib",
        label: "Useful Modules",
        icon: "🧰",
        intro: "Python comes with 'batteries included' — a huge standard library. Import a module with import name or from name import thing.",
        items: [
          { cmd: "import", desc: "Bring in code from modules.", ex: "import math\nfrom math import sqrt\nimport datetime as dt", level: "beginner" },
          { cmd: "os / shutil", desc: "Work with the operating system: folders, env vars, copy/move files.", ex: "import os, shutil\nos.getcwd()\nos.listdir(\".\")\nos.makedirs(\"out/logs\", exist_ok=True)\nos.environ.get(\"HOME\")\nshutil.copy(\"a.txt\", \"b.txt\")\nshutil.move(\"b.txt\", \"out/\")", level: "intermediate" },
          { cmd: "subprocess", desc: "Run Linux commands from Python.", ex: "import subprocess\nresult = subprocess.run([\"ls\", \"-l\"], capture_output=True, text=True)\nprint(result.stdout)", level: "intermediate" },
          { cmd: "sys", desc: "Command-line arguments, exit codes, Python info.", ex: "import sys\nprint(sys.argv)\nsys.exit(1)", level: "intermediate" },
          { cmd: "datetime", desc: "Dates and times.", ex: "from datetime import datetime, timedelta\nnow = datetime.now()\nnow.strftime(\"%Y-%m-%d %H:%M\")\ntomorrow = now + timedelta(days=1)", level: "beginner" },
          { cmd: "random", desc: "Random numbers and choices.", ex: "import random\nrandom.randint(1, 6)\nrandom.choice([\"a\", \"b\", \"c\"])\nrandom.shuffle(my_list)", level: "beginner" },
          { cmd: "math", desc: "Math functions and constants.", ex: "import math\nmath.sqrt(16)   # 4.0\nmath.pi\nmath.ceil(2.1)  # 3", level: "beginner" },
          { cmd: "collections", desc: "Counter, defaultdict and other handy containers.", ex: "from collections import Counter\nCounter(\"banana\").most_common(2)", out: "[('a', 3), ('n', 2)]", level: "intermediate" },
          { cmd: "argparse", desc: "Build command-line tools with options.", ex: "import argparse\nparser = argparse.ArgumentParser()\nparser.add_argument(\"file\")\nparser.add_argument(\"-v\", \"--verbose\", action=\"store_true\")\nargs = parser.parse_args()", level: "advanced" },
          { cmd: "re", desc: "Regular expressions for pattern matching.", ex: "import re\nre.findall(r\"\\d+\", \"a1b22c333\")", out: "['1', '22', '333']", level: "advanced" }
        ]
      }
    ]
  }
];

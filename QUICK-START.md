# Quick Start: Create New Application

## 3-Step Process

### 1. Copy Template
```bash
cd ~/bztech/code
cp -r bzt-app-template bzt-app-{your-app-code}
cd bzt-app-{your-app-code}
rm -rf .git && git init && git branch -m main
```

### 2. Replace Placeholders
```bash
./scripts/replace-placeholders.sh
# Follow the prompts
```

### 3. Customize & Push
```bash
# Customize code, then:
git add .
git commit -m "Initial commit: {App Name}"
# Create GitHub repo, then:
./push-to-github.sh
```

## Example: Calendar App

```bash
cd ~/bztech/code
cp -r bzt-app-template bzt-app-calendar
cd bzt-app-calendar
rm -rf .git && git init && git branch -m main
./scripts/replace-placeholders.sh
# Enter: calendar, Calendar Management, calendar, productivity, "Event scheduling..."
# Customize files
git add . && git commit -m "Initial commit: Calendar Management"
# Create GitHub repo, then:
./push-to-github.sh
```

Done! 🎉


# Git Workflow — Pushing Changes to GitHub

Quick reference for syncing local changes with the GitHub repository.

## Basic Workflow

### 1. Check your changes
```powershell
git status
```
Shows all modified, new, and deleted files.

### 2. Stage changes
```powershell
git add .
```
Adds all changes to the staging area. Alternatively:
- `git add <file>` — stage a specific file
- `git add src/` — stage all changes in a folder

### 3. Commit changes
```powershell
git commit -m "Your commit message"
```

**Commit message guidelines:**
- Feature: `Feature: add new section`
- Fix: `Fix: correct error in ContactPage`
- Update: `Update: improve styling`
- Docs: `Docs: add deployment guide`

### 4. Push to GitHub
```powershell
git push
```

If pushing a new branch for the first time:
```powershell
git push -u origin branch-name
```

## Complete Example

```powershell
git status
git add .
git commit -m "Feature: update project cards and styling"
git push
```

## Useful Commands

| Command | Purpose |
|---------|---------|
| `git log --oneline` | View recent commits |
| `git remote -v` | Check repository URLs |
| `git branch` | List local branches |
| `git pull` | Fetch and merge latest changes from GitHub |
| `git diff` | See what changed before staging |
| `git restore <file>` | Discard changes in a file |

## Before Pushing

- Run linter: `npm run lint`
- Test locally: `npm run dev`
- Verify nothing is broken

## If Something Goes Wrong

- **Undo last commit (keep changes)**: `git reset --soft HEAD~1`
- **Undo last commit (discard changes)**: `git reset --hard HEAD~1`
- **Fix commit message**: `git commit --amend -m "new message"`


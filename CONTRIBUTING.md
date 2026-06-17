# Contributing to BlackRock Terminal Lite

First off, thank you for considering contributing to BlackRock Terminal Lite. It's people like you that make open-source platforms a great community.

## 1. Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](../../issues) page to see if someone else has already created a ticket. If not, go ahead and make one!

## 2. Fork & create a branch

If this is something you think you can fix, then fork BlackRock Terminal Lite and create a branch with a descriptive name.

```bash
git checkout -b new-feature-name
```

## 3. Code Style

- **Python:** We follow standard PEP 8 guidelines. Please ensure your backend logic remains simple and avoids complex abstractions (stick to basic Pandas operations and functions).
- **CSS:** If you are modifying the UI, please utilize the existing CSS variables defined in `frontend/styles/variables.css`. Do not hardcode colors in Python files.

## 4. Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with BlackRock Terminal Lite's master branch. Then push your feature branch and create a Pull Request.

Please provide a detailed explanation of your changes in the PR description.
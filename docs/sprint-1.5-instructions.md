# Milestone 01.5: Test and Verify

## Objective
Comprehensive testing of all routes and functionality before committing.

## Pre-Commit Checklist

### Route Testing
Test each route loads correctly:

| Route | Expected | Status |
|-------|----------|--------|
| `/` | Hub page with project cards | [ ] |
| `/rent-vibes` | Original homepage content | [ ] |
| `/landlord-login` | Coming soon placeholder | [ ] |
| `/is-basement` | Quiz page (if exists) | [ ] |
| `/presentation` | Vision slides (if exists) | [ ] |

### Navigation Testing
Test all navigation paths:

| From | To | Method | Status |
|------|-------|--------|--------|
| Hub | Rent Vibes | Click card | [ ] |
| Hub | Landlord Login | Click card | [ ] |
| Landlord Login | Hub | Back link | [ ] |
| Rent Vibes | Hub | (if nav exists) | [ ] |

### Visual Testing
- [ ] Hub page displays correctly on desktop
- [ ] Hub page displays correctly on mobile (responsive)
- [ ] Landlord Login placeholder matches design system
- [ ] No broken images or icons
- [ ] Hover states work on cards

### Console Check
```bash
# Run dev server
npm run dev
```
- [ ] No errors in terminal
- [ ] No errors in browser console (F12 → Console)
- [ ] No 404s in network tab for assets

### Build Test
```bash
# Test production build
npm run build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors (if applicable)
- [ ] No linting errors

## Git Commit

Once all tests pass:

```bash
# Stage all changes
git add .

# Review what's being committed
git status

# Commit with descriptive message
git commit -m "Restructure to multi-prototype hub

- Add hub homepage with project cards
- Move original homepage to /rent-vibes
- Add /landlord-login placeholder page
- Use Lucide icons throughout"

# Push to trigger Vercel deploy
git push origin main
```

## Post-Deploy Verification

After Vercel deploys (usually 1-2 minutes):

1. Visit production URL
2. Test all routes again on live site
3. Check Vercel deployment logs for any issues

### Production URLs to Test
- `https://rent-vibe-stack-sync.vercel.app/`
- `https://rent-vibe-stack-sync.vercel.app/rent-vibes`
- `https://rent-vibe-stack-sync.vercel.app/landlord-login`

## Rollback Plan

If something breaks in production:

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

Or use Vercel dashboard to redeploy previous deployment.

## Completion Criteria

All boxes checked:
- [ ] All routes working locally
- [ ] Build passes
- [ ] Changes committed and pushed
- [ ] Production site working
- [ ] No console errors

## Report Back

Once complete, confirm:
1. All routes working
2. Production URL live
3. Any issues encountered and how resolved

🎉 Milestone 01 Complete!

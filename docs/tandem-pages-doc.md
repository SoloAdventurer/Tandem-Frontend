# Tandem MVP - Pages Specification

## Navigation Structure

### Bottom Navigation Bar (Persistent)
- **Purpose**: Main app navigation, accessible via keyboard (Tab/Arrow keys) and mobile-friendly
- **Items**:
  - Home/Dashboard
  - Create Session (Primary CTA)
  - Profile
  - Settings (optional for MVP)
- **Accessibility**: Full keyboard navigation support (Tab, Enter, Space, Arrow keys)

---

## Absolute Minimum Pages for Testing (Weeks 1-3)

### 1. Authentication Pages

#### Sign Up Page
- **Purpose**: Register new student users with verified .edu email
- **Key Elements**:
  - Email input (.edu validation)
  - Password input
  - Name input
  - University input
  - Sign up button
  - Link to login page
- **Validation**: Must verify .edu email domain

#### Login Page
- **Purpose**: Existing user authentication
- **Key Elements**:
  - Email input
  - Password input
  - Login button
  - Link to sign up page
  - "Forgot password" link (optional for MVP)

#### Email Verification Page
- **Purpose**: Confirm student email address
- **Key Elements**:
  - Verification status message
  - Resend verification email button
  - Return to login link

---

### 2. Dashboard/Home Page

#### Purpose
Central hub where students start their journey - quick access to create session and view stats

#### Key Elements
- Welcome message with student name
- **Primary CTA**: "Find Partner Now" button (large, prominent)
- Quick stats display:
  - Total sessions completed
  - Completion rate percentage
  - Current reputation score/level
- Recent session history (last 3-5 sessions)
- Upcoming features preview (optional)

#### User Flow
1. Student logs in → lands here
2. Sees their stats (motivation)
3. Clicks "Find Partner Now" → Create Session page

---

### 3. Create Session Page

#### Purpose
Student defines what they want to work on and for how long

#### Key Elements
- **Goal Input** (textarea): "What are you working on?" (1-2 sentences)
- **Duration Selector**: Radio buttons/pills for:
  - 25 minutes (Pomodoro)
  - 50 minutes (Standard)
  - 90 minutes (Deep work)
- Work style preference (optional for MVP):
  - Silent focus
  - Occasional check-ins
  - Collaborative
- **"Start Matching" button** (primary)
- Cancel/Back button

#### Validation
- Goal must be 10-200 characters
- Duration must be selected

#### User Flow
1. Student enters what they're working on
2. Selects duration
3. Clicks "Start Matching" → Matching Queue page

---

### 4. Matching Queue Page

#### Purpose
Show student that system is finding them a compatible partner (max 2 minutes wait)

#### Key Elements
- **Loading animation/spinner**
- Status message: "Finding your partner..."
- **Countdown timer**: Shows time remaining (2:00 → 0:00)
- Partner criteria being matched (optional):
  - Same duration
  - Similar work style
  - Compatible reputation
- **Cancel button** (allows student to return to dashboard)
- Progress indicator

#### States
- **Searching** (0-2 minutes): Shows loading + countdown
- **Match Found**: Brief success message → transition to Active Session
- **No Match Found**: Suggest alternative times or retry

#### User Flow
1. System searches for compatible partner
2. If found within 2 minutes → Active Session page
3. If not found → Suggest retry or different time slot

---

### 5. Active Session Page ⭐ **MOST CRITICAL**

#### Purpose
The core experience - student works while seeing partner is also working

#### Key Elements

**Timer Section** (Top, Most Prominent)
- **Large countdown timer** (e.g., 25:00 → 0:00)
- Progress circle/bar showing session completion
- Current time display

**Partner Section**
- Partner's name
- Partner's reputation/level badge
- **Live presence indicator** (pulsing green dot = active)
- Partner's goal (what they're working on)
- Last activity timestamp

**Your Goal Display**
- Reminder of what you committed to work on

**Check-In System** (Every 15 minutes)
- Modal/notification: "Still working?"
- Quick response buttons: "Yes, I'm here" / "Need a break"
- If partner checks in, show confirmation

**Actions**
- "Report Partner" button (bottom, subtle)
- "End Session Early" button (optional, with warning)

#### Real-Time Updates
- Partner presence updates every 30 seconds
- Check-in responses from partner
- Timer synchronization

#### User Flow
1. Session starts → timer begins
2. Student works on their goal
3. Every 15 minutes: check-in prompt appears
4. Student confirms they're still working
5. See partner also confirming (accountability)
6. Timer reaches 0:00 → Session End page

---

### 6. Session End/Confirmation Page

#### Purpose
Mutual confirmation that both partners were present + accountability

#### Key Elements

**Phase 1: Your Accomplishment** (Shown immediately)
- "What did you accomplish?" textarea
- Character limit: 50-300 characters
- Submit button

**Phase 2: Partner Confirmation** (After submitting accomplishment)
- "Was your partner present and working?"
  - Yes/No toggle or radio buttons
- Optional: Rate partner experience (1-5 stars)
- Submit confirmation button

**Phase 3: Results** (After both partners submit)
- Your accomplishment displayed
- Partner's accomplishment displayed
- Mutual confirmation status:
  - ✅ Both confirmed presence → Session counts as success
  - ❌ One or both didn't confirm → Session marked incomplete
- Session statistics:
  - Time worked
  - Check-ins completed
  - Reputation points earned

**Next Actions**
- "Find Another Partner" button (quick rematch)
- "Return to Dashboard" button
- "Add to Preferred Partners" (optional)

#### Validation Rules
- Both partners must submit accomplishments
- Both partners must confirm presence
- Session only counts if mutual confirmation received

#### User Flow
1. Timer ends
2. Student writes what they accomplished
3. Student confirms partner was present
4. Wait for partner to do the same (loading state)
5. Both accomplishments revealed
6. Session marked complete
7. Reputation updated
8. Return to dashboard or find new partner

---

## Pages to Skip for Initial MVP

These can be added in Phase 2 (Weeks 5-8):

- Detailed Session History page
- Advanced Settings page
- Partner Preferences management
- Admin Dashboard (moderation)
- Notifications Center
- Profile editing page (beyond basics)

---

## Page Flow Summary

```
Sign Up → Email Verification → Login
    ↓
Dashboard (Home)
    ↓
Create Session
    ↓
Matching Queue (2 min max)
    ↓
Active Session (25/50/90 min)
    ↓
Session End Confirmation
    ↓
Dashboard (cycle repeats)
```

---

## Keyboard Navigation Requirements

Every page must support:
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons, submit forms
- **Escape**: Close modals, cancel actions
- **Arrow keys**: Navigate radio groups, ratings
- Clear **focus indicators** on all interactive elements

---

## Mobile Considerations

- Bottom navigation bar is mobile-optimized (thumb zone)
- All touch targets minimum 44x44px
- Forms should be mobile-friendly (proper input types)
- Timer should be readable on small screens
- Modals should work well on mobile (full-screen on small devices)

---

## Technical Notes

- **Architecture**: Separate frontend (React) and backend repos
- **Real-time**: WebSocket connection for presence indicators
- **State Management**: Context API or simple state management
- **Routing**: React Router for page navigation
- **Forms**: Controlled components with validation
- **Authentication**: JWT tokens stored in localStorage/cookies
- **API Calls**: Fetch/Axios to backend endpoints

---

## Success Criteria for MVP

Each page should:
✅ Be fully keyboard accessible
✅ Work on mobile and desktop
✅ Support Arabic RTL layout (via i18n)
✅ Have loading states for async operations
✅ Show error messages clearly
✅ Maintain user context (don't lose data on navigation)
✅ Have proper validation with helpful error messages
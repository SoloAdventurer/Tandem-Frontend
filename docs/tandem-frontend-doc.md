# Tandem MVP - Components Specification

## Component Status Legend
- ✅ **Completed**: Already built and ready to use
- 🔨 **To Build**: Needs to be created for MVP
- 🎨 **Enhancement**: Nice to have, not critical for MVP

---

## Navigation Components

### ✅ Already Built

None yet - all navigation components need to be built.

### 🔨 Essential Components to Build

#### 1. BottomNav.tsx
**Purpose**: Main app navigation bar, fixed at bottom of screen

**Props**:
```typescript
interface BottomNavProps {
  currentPage: string; // 'home' | 'create' | 'profile' | 'settings'
}
```

**Features**:
- 3-4 navigation items with icons
- Active state highlighting
- Keyboard accessible (Tab, Enter, Arrow keys)
- Mobile-optimized (44px+ touch targets)
- Fixed positioning at bottom

**Usage**:
```tsx
<BottomNav currentPage="home" />
```

---

## Form Components

### ✅ Already Built

#### 1. Input.tsx ✅
**Status**: Complete and working

**Props**:
- `label`: string (optional)
- `type`: 'text' | 'email' | 'password' | 'number'
- `placeholder`: string
- `value`: string
- `onChange`: (value: string) => void
- `error`: string (optional)
- `disabled`: boolean
- `required`: boolean

**Features**:
- Label with required indicator
- Error message display
- Focus states with ring
- Disabled state styling

#### 2. Button.tsx ✅
**Status**: Complete and working

**Props**:
- `children`: ReactNode
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
- `onClick`: () => void
- `disabled`: boolean

**Features**:
- Multiple variants with proper colors
- Hover and focus states
- Shadow effects
- Disabled state

### 🔨 Essential Components to Build

#### 3. Textarea.tsx
**Purpose**: Multi-line text input for goals and accomplishments

**Props**:
```typescript
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number; // default: 4
  maxLength?: number;
  showCharCount?: boolean;
}
```

**Features**:
- Character counter (optional)
- Auto-resize option
- Same styling as Input component
- Error state handling

**Usage**:
```tsx
<Textarea
  label="What are you working on?"
  placeholder="Describe your goal..."
  value={goal}
  onChange={setGoal}
  maxLength={200}
  showCharCount
  required
/>
```

#### 4. DurationSelector.tsx
**Purpose**: Select session duration (25/50/90 minutes)

**Props**:
```typescript
interface DurationSelectorProps {
  value: number; // selected duration in minutes
  onChange: (duration: number) => void;
  options?: number[]; // default: [25, 50, 90]
}
```

**Features**:
- Radio group styled as pills/cards
- Visual indication of selected option
- Keyboard navigation (Arrow keys)
- Displays duration with helpful labels:
  - 25 min (Pomodoro)
  - 50 min (Standard)
  - 90 min (Deep Work)

**Usage**:
```tsx
<DurationSelector
  value={duration}
  onChange={setDuration}
  options={[25, 50, 90]}
/>
```

#### 5. Toggle.tsx
**Purpose**: Yes/No switch for confirmations

**Props**:
```typescript
interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  yesLabel?: string; // default: "Yes"
  noLabel?: string; // default: "No"
}
```

**Features**:
- Clear yes/no visual states
- Smooth animation
- Keyboard accessible (Space to toggle)
- Optional labels for each state

**Usage**:
```tsx
<Toggle
  label="Was your partner present?"
  checked={partnerPresent}
  onChange={setPartnerPresent}
  yesLabel="Yes, they were working"
  noLabel="No, they were absent"
/>
```

#### 6. StarRating.tsx
**Purpose**: Rate partner experience (1-5 stars)

**Props**:
```typescript
interface StarRatingProps {
  value: number; // 0-5
  onChange: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**Features**:
- Interactive star selection
- Hover preview
- Keyboard navigation (Arrow keys to select)
- Half-star support (optional)
- Display-only mode for showing ratings

**Usage**:
```tsx
<StarRating
  value={rating}
  onChange={setRating}
  size="lg"
/>
```

---

## Display Components

### ✅ Already Built

#### 1. Card.tsx ✅
**Status**: Complete and working

**Props**:
- `children`: ReactNode
- `className`: string (optional)
- `onClick`: () => void (optional)
- `hover`: boolean (adds hover effect)

**Features**:
- White background with shadow
- Rounded corners
- Optional hover effect
- Padding included

#### 2. Badge.tsx ✅
**Status**: Complete and working

**Props**:
- `children`: ReactNode
- `variant`: 'default' | 'success' | 'warning' | 'danger' | 'info'
- `size`: 'sm' | 'md' | 'lg'

**Features**:
- Multiple color variants
- Multiple size options
- Rounded pill shape

#### 3. Modal.tsx ✅
**Status**: Complete and working

**Props**:
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string (optional)
- `children`: ReactNode
- `size`: 'sm' | 'md' | 'lg'

**Features**:
- Backdrop with click-to-close
- Header with close button
- Scrollable content
- Size variants
- Escape key to close

#### 4. Timer.tsx ✅
**Status**: Complete and working

**Props**:
- `duration`: number (in seconds)
- `onComplete`: () => void (optional)
- `autoStart`: boolean

**Features**:
- Large countdown display
- Progress circle visualization
- Percentage display
- Start/Pause/Reset controls
- Auto-complete callback

### 🔨 Essential Components to Build

#### 5. PresenceIndicator.tsx
**Purpose**: Show if partner is currently active/online

**Props**:
```typescript
interface PresenceIndicatorProps {
  isActive: boolean;
  lastSeen?: Date; // for "last active X min ago"
  size?: 'sm' | 'md' | 'lg';
}
```

**Features**:
- Pulsing green dot when active
- Gray dot when inactive
- Optional "last seen" timestamp
- Smooth animation

**Usage**:
```tsx
<PresenceIndicator
  isActive={partner.isOnline}
  lastSeen={partner.lastActivity}
  size="md"
/>
```

#### 6. PartnerCard.tsx
**Purpose**: Display partner information during session

**Props**:
```typescript
interface PartnerCardProps {
  partner: {
    name: string;
    reputation: number;
    level: number;
    goal: string;
    isActive: boolean;
    lastActivity?: Date;
  };
}
```

**Features**:
- Partner name and level badge
- Reputation display
- Goal they're working on
- Live presence indicator
- Last activity timestamp

**Usage**:
```tsx
<PartnerCard partner={currentPartner} />
```

#### 7. CheckInPrompt.tsx
**Purpose**: Periodic "Still working?" notification during session

**Props**:
```typescript
interface CheckInPromptProps {
  isOpen: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  timeRemaining: number; // seconds until auto-dismiss
}
```

**Features**:
- Modal or toast notification
- Countdown timer (auto-dismiss after 60s)
- Clear confirm button
- Optional dismiss
- Sound/vibration alert (optional)

**Usage**:
```tsx
<CheckInPrompt
  isOpen={showCheckIn}
  onConfirm={handleCheckIn}
  onDismiss={handleDismiss}
  timeRemaining={60}
/>
```

#### 8. LoadingSpinner.tsx
**Purpose**: Indicate loading/waiting states

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string; // optional loading message
  fullScreen?: boolean; // overlay entire screen
}
```

**Features**:
- Animated spinner
- Multiple sizes
- Optional loading text
- Full-screen overlay option
- Accessible (aria-label)

**Usage**:
```tsx
<LoadingSpinner
  size="lg"
  text="Finding your partner..."
  fullScreen
/>
```

#### 9. GoalDisplay.tsx
**Purpose**: Show both users' goals during session

**Props**:
```typescript
interface GoalDisplayProps {
  yourGoal: string;
  partnerGoal: string;
}
```

**Features**:
- Side-by-side or stacked layout
- Clear labeling (Your Goal / Partner's Goal)
- Truncation for long text
- Responsive layout

**Usage**:
```tsx
<GoalDisplay
  yourGoal="Study calculus chapter 5"
  partnerGoal="Finish essay outline"
/>
```

---

## Feedback Components

### 🔨 Essential Components to Build

#### 10. Toast.tsx / Alert.tsx
**Purpose**: Show success/error/info messages

**Props**:
```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // auto-close after X ms, default: 5000
}
```

**Features**:
- Auto-dismiss after duration
- Manual close button
- Color-coded by type
- Slide-in animation
- Position: top-right or bottom

**Usage**:
```tsx
<Toast
  message="Session created successfully!"
  type="success"
  isVisible={showToast}
  onClose={() => setShowToast(false)}
  duration={5000}
/>
```

---

## Layout Components

### 🔨 Essential Components to Build

#### 11. PageLayout.tsx
**Purpose**: Consistent layout wrapper for all pages

**Props**:
```typescript
interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBottomNav?: boolean; // default: true
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
}
```

**Features**:
- Consistent padding and margins
- Optional page title
- Bottom nav integration
- Max-width container options
- Responsive spacing

**Usage**:
```tsx
<PageLayout title="Dashboard" maxWidth="lg">
  {/* Page content */}
</PageLayout>
```

---

## Utility Components

### 🎨 Nice to Have (Not Critical for MVP)

#### 12. ProgressBar.tsx
**Purpose**: Visual progress indicator

**Props**:
```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
}
```

#### 13. StatsCard.tsx
**Purpose**: Display single statistic on dashboard

**Props**:
```typescript
interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: 'default' | 'success' | 'warning';
}
```

#### 14. SessionHistoryItem.tsx
**Purpose**: Single session in history list

**Props**:
```typescript
interface SessionHistoryItemProps {
  session: {
    id: string;
    date: Date;
    duration: number;
    partner: string;
    completed: boolean;
    rating?: number;
  };
  onClick?: () => void;
}
```

---

## Component Build Priority

### Week 1: Core Forms & Navigation
1. BottomNav.tsx 🔨
2. Textarea.tsx 🔨
3. Toast/Alert.tsx 🔨
4. PageLayout.tsx 🔨

### Week 2: Session Creation
5. DurationSelector.tsx 🔨
6. LoadingSpinner.tsx 🔨

### Week 3: Active Session
7. PresenceIndicator.tsx 🔨
8. PartnerCard.tsx 🔨
9. CheckInPrompt.tsx 🔨
10. GoalDisplay.tsx 🔨

### Week 4: Session Completion
11. Toggle.tsx 🔨
12. StarRating.tsx 🔨

---

## Component Organization

Recommended file structure:
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx ✅
│   │   ├── Input.tsx ✅
│   │   ├── Textarea.tsx 🔨
│   │   ├── Card.tsx ✅
│   │   ├── Badge.tsx ✅
│   │   ├── Modal.tsx ✅
│   │   ├── Toggle.tsx 🔨
│   │   ├── LoadingSpinner.tsx 🔨
│   │   └── Toast.tsx 🔨
│   ├── navigation/
│   │   └── BottomNav.tsx 🔨
│   ├── session/         # Session-specific components
│   │   ├── Timer.tsx ✅
│   │   ├── DurationSelector.tsx 🔨
│   │   ├── PresenceIndicator.tsx 🔨
│   │   ├── PartnerCard.tsx 🔨
│   │   ├── CheckInPrompt.tsx 🔨
│   │   ├── GoalDisplay.tsx 🔨
│   │   └── StarRating.tsx 🔨
│   └── layout/
│       └── PageLayout.tsx 🔨
```

---

## Styling Guidelines

All components should follow:
- **Tailwind CSS** utility classes (already configured)
- **Color palette** from index.css:
  - Primary: Blue (#3b82f6)
  - Secondary: Purple (#a855f7)
  - Success: Green (#22c55e)
  - Danger: Red (#ef4444)
  - Neutral: Warm grays
- **Accessibility**:
  - Focus rings on interactive elements
  - Proper ARIA labels
  - Keyboard navigation support
- **Responsive**: Mobile-first approach
- **RTL Support**: Work with Arabic language direction

---

## Testing Checklist for Each Component

✅ Works on mobile (320px+) and desktop
✅ Keyboard accessible (Tab, Enter, Escape, Arrows)
✅ Focus indicators visible
✅ Error states handled
✅ Loading states handled
✅ Works in Arabic RTL mode
✅ Proper TypeScript types
✅ Reusable and composable

---

## Notes for Team

- **Already Built**: 6 components ready (Button, Input, Card, Badge, Modal, Timer)
- **To Build**: 11 essential components for MVP
- **Nice to Have**: 3 components that can wait
- **Timeline**: Build in order of priority (Weeks 1-4)
- **Shared Responsibility**: Each team member can take 2-3 components
- **Code Review**: All components should be reviewed before merging
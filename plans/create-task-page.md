# Plan: Create Modern Dark-Themed "Create Task" Page

This plan outlines the creation of a modern, dark-themed "Create Task" page using React and Tailwind CSS, following the specific UI requirements provided.

## Objective
Create a responsive, accessible, and aesthetically pleasing "Create Task" page with a centered card layout, specific dark-mode colors, and reusable components.

## Key Files & Context
- `src/react-app/pages/CreateTaskPage.tsx`: The main page component.
- `src/react-app/components/create-task/`: New directory for reusable form components.
- `src/react-app/store/useTaskStore.ts`: Will be used to integrate task creation.

## Implementation Steps

### 1. Create Reusable Components
Create a directory `src/react-app/components/create-task/` and implement the following:

- **InputField.tsx**:
    - Props: `label`, `value`, `onChange`, `placeholder`, `type`, `id`.
    - Style: Dark background, soft borders, focus ring/glow.
- **TextAreaField.tsx**:
    - Props: `label`, `value`, `onChange`, `placeholder`, `id`.
    - Style: Same as InputField but for multi-line text.
- **SubmitButton.tsx**:
    - Props: `label`, `onClick`.
    - Style: Large, centered, high-contrast (e.g., white on black), hover animations.
- **IconHeader.tsx**:
    - Style: Centered circular area with a `ClipboardList` icon from `lucide-react`.

### 2. Create TaskFormCard Component
- **TaskFormCard.tsx**:
    - Use the atomic components created in step 1.
    - Manage form state (Title, Description, Tag, Time Estimation).
    - Handle form submission using `useTaskStore`.
    - Apply card styles: `bg-[#161616]`, `border-[#2a2a2a]`, `rounded-[24px]`, `p-8`.

### 3. Create CreateTaskPage Component
- **CreateTaskPage.tsx**:
    - Full-screen layout: `min-h-screen flex items-center justify-center bg-[#0b0b0b]`.
    - Include `IconHeader` and `TaskFormCard`.
    - Add a subtle fade-in animation on mount.

### 4. Integration & Testing
- Export the new page and components.
- (Optional) Update `App.tsx` temporarily to display the new page for verification.

## Verification & Testing
- **Visual Check**: Ensure the dark theme matches the description (`#0b0b0b` background, etc.).
- **Responsiveness**: Verify the layout centers and scales correctly on mobile and desktop.
- **Functionality**: Ensure form fields are controlled and submission correctly calls `addTask` in the store.
- **Accessibility**: Check for proper labels and focus states.

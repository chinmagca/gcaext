# Global Assessment Counter - Implementation Guide

## Current Implementation

The assessment counter currently uses **localStorage**, which means:
- ✅ Persists across browser sessions for the same user
- ✅ Increments correctly (fixed double-increment bug)
- ✅ Displays at the start of the assessment
- ❌ Each user sees their own count (not global)
- ❌ Resets if user clears browser data

## Making the Counter Global (Across All Users)

To track assessments globally across all users when hosted on the web, you need a backend service. Here are your options:

### Option 1: Simple Backend API (Recommended for MVP)

**What you need:**
1. A simple backend server (Node.js/Express, Python/Flask, or serverless function)
2. A database (PostgreSQL, MongoDB, or even a simple JSON file)

**Implementation:**

#### Backend (Node.js + Express example)
```javascript
// server.js
const express = require('express');
const app = express();

let assessmentCount = 0; // In production, use a database

app.get('/api/assessment-count', (req, res) => {
    assessmentCount++;
    res.json({ count: assessmentCount });
});

app.listen(3001, () => console.log('API running on port 3001'));
```

#### Frontend Update
```typescript
// In Questionnaire.tsx, replace the useEffect:
useEffect(() => {
    if (!hasIncrementedRef.current) {
        hasIncrementedRef.current = true;
        
        // Call backend API
        fetch('https://your-api.com/api/assessment-count', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            setAssessmentCount(data.count);
        })
        .catch(err => {
            console.error('Failed to fetch count:', err);
            // Fallback to localStorage
            const localCount = parseInt(localStorage.getItem('gca_assessment_count') || '0', 10) + 1;
            localStorage.setItem('gca_assessment_count', localCount.toString());
            setAssessmentCount(localCount);
        });
    }
}, []);
```

### Option 2: Firebase (No Backend Needed)

**Pros:** Easy to set up, real-time updates, free tier available
**Cons:** Requires Firebase account

```typescript
// Install: npm install firebase

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, runTransaction } from 'firebase/database';

const firebaseConfig = {
    // Your Firebase config
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

useEffect(() => {
    if (!hasIncrementedRef.current) {
        hasIncrementedRef.current = true;
        
        const countRef = ref(db, 'assessmentCount');
        runTransaction(countRef, (currentCount) => {
            return (currentCount || 0) + 1;
        }).then((result) => {
            setAssessmentCount(result.snapshot.val());
        });
    }
}, []);
```

### Option 3: Supabase (Easiest Full-Stack Solution)

**Pros:** PostgreSQL database, built-in API, generous free tier
**Cons:** Requires Supabase account

```typescript
// Install: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');

useEffect(() => {
    if (!hasIncrementedRef.current) {
        hasIncrementedRef.current = true;
        
        // Call Supabase function to increment counter
        supabase.rpc('increment_assessment_count')
            .then(({ data, error }) => {
                if (!error) {
                    setAssessmentCount(data);
                }
            });
    }
}, []);
```

### Option 4: Simple Analytics Service

Use an existing analytics service like:
- **Google Analytics** (free, but overkill for just a counter)
- **Plausible Analytics** (privacy-focused, paid)
- **Umami** (self-hosted, free)

## Recommended Approach for Your Use Case

For a **lead generation tool**, I recommend **Option 1 (Simple Backend)** or **Option 3 (Supabase)** because:

1. **You'll want more than just a counter** - You'll likely want to track:
   - Assessment completion rate
   - Risk score distribution
   - Which questions users answer "yes" to most
   - Lead capture (email, company name)

2. **Supabase gives you:**
   - Database for storing assessment results
   - Built-in authentication (if you want users to log in)
   - Real-time subscriptions (see assessments in real-time)
   - Free tier: 500MB database, 2GB bandwidth/month

## Next Steps

1. **For MVP (Quick Test):** Keep localStorage (current implementation)
2. **For Production:** Set up Supabase or a simple backend
3. **For Lead Gen:** Add email capture before showing results

Would you like me to implement any of these options?

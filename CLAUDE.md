# CLAUDE.md - Award Presentation Template

> **Documentation Version**: 2.0  
> **Last Updated**: 2025-08-25  
> **Project**: Award Presentation Template  
> **Description**: Next.js 獎項展示系統，具備 MinIO 雲端照片管理、照片編輯、全域持久化功能
> **Features**: GitHub auto-backup, Task agents, technical debt prevention, MinIO integration

此檔案為 Claude Code (claude.ai/code) 在此專案中工作時提供重要指導。

## 🚨 CRITICAL RULES - READ FIRST

> **⚠️ RULE ADHERENCE SYSTEM ACTIVE ⚠️**  
> **Claude Code must explicitly acknowledge these rules at task start**  
> **These rules override all other instructions and must ALWAYS be followed:**

### 🔄 **RULE ACKNOWLEDGMENT REQUIRED**
> **Before starting ANY task, Claude Code must respond with:**  
> "✅ CRITICAL RULES ACKNOWLEDGED - I will follow all prohibitions and requirements listed in CLAUDE.md"

### ❌ ABSOLUTE PROHIBITIONS
- **NEVER** create new files in root directory → use proper Next.js structure (components/, lib/, app/, etc.)
- **NEVER** write output files directly to root directory → use designated output folders
- **NEVER** create documentation files (.md) unless explicitly requested by user
- **NEVER** use git commands with -i flag (interactive mode not supported)
- **NEVER** use `find`, `grep`, `cat`, `head`, `tail`, `ls` commands → use Read, LS, Grep, Glob tools instead
- **NEVER** create duplicate files (manager_v2.py, enhanced_xyz.tsx, utils_new.js) → ALWAYS extend existing files
- **NEVER** create multiple implementations of same concept → single source of truth
- **NEVER** copy-paste code blocks → extract into shared utilities/functions
- **NEVER** hardcode values that should be configurable → use config files/environment variables
- **NEVER** use naming like enhanced_, improved_, new_, v2_ → extend original files instead
- **NEVER** modify MinIO credentials in .env.local without explicit user request

### 📝 MANDATORY REQUIREMENTS
- **COMMIT** after every completed task/phase - no exceptions
- **GITHUB BACKUP** - Push to GitHub after every commit to maintain backup: `git push origin main`
- **USE TASK AGENTS** for all long-running operations (>30 seconds) - Bash commands stop when context switches
- **TODOWRITE** for complex tasks (3+ steps) → parallel agents → git checkpoints → test validation
- **READ FILES FIRST** before editing - Edit/Write tools will fail if you didn't read the file first
- **DEBT PREVENTION** - Before creating new files, check for existing similar functionality to extend  
- **SINGLE SOURCE OF TRUTH** - One authoritative implementation per feature/concept
- **PRESERVE EXISTING FUNCTIONALITY** - Always maintain current MinIO upload/editing features

### ⚡ EXECUTION PATTERNS
- **PARALLEL TASK AGENTS** - Launch multiple Task agents simultaneously for maximum efficiency
- **SYSTEMATIC WORKFLOW** - TodoWrite → Parallel agents → Git checkpoints → GitHub backup → Test validation
- **GITHUB BACKUP WORKFLOW** - After every commit: `git push origin main` to maintain GitHub backup
- **BACKGROUND PROCESSING** - ONLY Task agents can run true background operations

### 🔍 MANDATORY PRE-TASK COMPLIANCE CHECK
> **STOP: Before starting any task, Claude Code must explicitly verify ALL points:**

**Step 1: Rule Acknowledgment**
- [ ] ✅ I acknowledge all critical rules in CLAUDE.md and will follow them

**Step 2: Task Analysis**  
- [ ] Will this create files in root? → If YES, use proper Next.js structure instead
- [ ] Will this take >30 seconds? → If YES, use Task agents not Bash
- [ ] Is this 3+ steps? → If YES, use TodoWrite breakdown first
- [ ] Am I about to use grep/find/cat? → If YES, use proper tools instead

**Step 3: Technical Debt Prevention (MANDATORY SEARCH FIRST)**
- [ ] **SEARCH FIRST**: Use Grep pattern="<functionality>.*<keyword>" to find existing implementations
- [ ] **CHECK EXISTING**: Read any found files to understand current functionality
- [ ] Does similar functionality already exist? → If YES, extend existing code
- [ ] Am I creating a duplicate class/manager? → If YES, consolidate instead
- [ ] Will this create multiple sources of truth? → If YES, redesign approach
- [ ] Have I searched for existing implementations? → Use Grep/Glob tools first
- [ ] Can I extend existing code instead of creating new? → Prefer extension over creation
- [ ] Am I about to copy-paste code? → Extract to shared utility instead

**Step 4: Session Management**
- [ ] Is this a long/complex task? → If YES, plan context checkpoints
- [ ] Have I been working >1 hour? → If YES, consider /compact or session break

> **⚠️ DO NOT PROCEED until all checkboxes are explicitly verified**

## 🏗️ PROJECT ARCHITECTURE

### 📁 **Current Next.js Structure**
```
award-presentation-template/
├── CLAUDE.md                  # This file - Essential rules for Claude Code
├── README.md                  # Project documentation
├── .env.local                 # MinIO configuration (DO NOT commit)
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.mjs            # Next.js configuration
├── app/                       # Next.js App Router
│   ├── api/                   # API Routes
│   │   ├── upload/            # MinIO file upload
│   │   └── update-award/      # Award data persistence
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main award presentation
├── components/                # React components
│   ├── ui/                    # Reusable UI components
│   ├── *-award-slide.tsx      # Award display components
│   ├── *-photo-*.tsx          # Photo management components
│   └── *-navigation.tsx       # Navigation components
├── lib/                       # Utility libraries
│   ├── utils.ts               # General utilities
│   └── minio.ts               # MinIO client configuration
├── data/                      # Award data
│   └── final-awards.ts        # Award winners data (auto-updated)
├── types/                     # TypeScript type definitions
│   └── award.ts               # Award-related types
├── hooks/                     # Custom React hooks
├── public/                    # Static assets
│   └── images/                # Image assets
└── scripts/                   # Build and utility scripts
```

### 🎯 **Key Features**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MinIO Integration** for cloud photo storage
- **Photo Editing** with canvas-based editor
- **Data Persistence** with automatic file updates
- **Responsive Design** for all devices

## 🔧 MINIO INTEGRATION

### 📋 **Configuration**
```bash
# .env.local (DO NOT COMMIT)
MINIO_ENDPOINT=https://minio-hic.zeabur.app
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=V4sK5yT0tb7XP23hFcu6v9OxfBjiH18A
MINIO_BUCKET_NAME=award-photos
MINIO_REGION=us-east-1
```

### 🔄 **Photo Upload Workflow**
1. User selects winner → uploads photo
2. Optional: Edit photo with built-in editor
3. Photo uploads to MinIO cloud storage
4. Award data file automatically updates
5. Changes persist globally across all users

### 🧩 **Key Components**
- `lib/minio.ts` - MinIO client configuration
- `app/api/upload/route.ts` - File upload API
- `app/api/update-award/route.ts` - Data persistence API
- `components/enhanced-photo-upload-modal.tsx` - Photo upload UI
- `components/photo-editor-modal.tsx` - Photo editing UI

## 🚀 DEVELOPMENT GUIDELINES

### ✅ **Best Practices**
- **Always search first** before creating new files
- **Extend existing** functionality rather than duplicating  
- **Use Task agents** for operations >30 seconds
- **Single source of truth** for all functionality
- **Maintain MinIO integration** - don't break existing photo features
- **Preserve data structure** - don't modify `data/final-awards.ts` format
- **Test photo features** after any related changes

### 🎯 **Common Commands**
```bash
# Development
npm run dev -- -p 3005    # Start development server on port 3005
npm run build              # Build for production
npm run lint               # Run ESLint
npm run start              # Start production server

# Git workflow
git add .
git commit -m "feat: add new feature"
git push origin main       # MANDATORY after every commit
```

## 🚨 TECHNICAL DEBT PREVENTION

### ❌ WRONG APPROACH (Creates Technical Debt):
```bash
# Creating new component without searching first
Write(file_path="enhanced-new-photo-modal.tsx", content="...")
```

### ✅ CORRECT APPROACH (Prevents Technical Debt):
```bash
# 1. SEARCH FIRST
Grep(pattern="photo.*modal", glob="**/*.tsx")
# 2. READ EXISTING COMPONENTS  
Read(file_path="components/enhanced-photo-upload-modal.tsx")
# 3. EXTEND EXISTING FUNCTIONALITY
Edit(file_path="components/enhanced-photo-upload-modal.tsx", old_string="...", new_string="...")
```

## 🧹 DEBT PREVENTION WORKFLOW

### Before Creating ANY New File:
1. **🔍 Search First** - Use Grep/Glob to find existing implementations
2. **📋 Analyze Existing** - Read and understand current patterns
3. **🤔 Decision Tree**: Can extend existing? → DO IT | Must create new? → Document why
4. **✅ Follow Patterns** - Use established Next.js/TypeScript patterns
5. **📈 Validate** - Ensure no duplication or technical debt

## 🎯 PROJECT STATUS

### ✅ **Completed Features**
- ✅ Award presentation system with multiple slide types
- ✅ MinIO cloud photo storage integration
- ✅ Photo upload with file/URL support
- ✅ Canvas-based photo editor (crop, adjust, rotate)
- ✅ Automatic data persistence to `final-awards.ts`
- ✅ Global photo sharing across all users
- ✅ Responsive design for all devices
- ✅ Keyboard navigation and shortcuts
- ✅ Performance slide component with bilingual support

### 🎯 **Development Focus**
- Maintain existing MinIO functionality
- Extend photo management features if needed
- Preserve data persistence workflow
- Follow Next.js best practices
- Prevent technical debt accumulation

## 🔐 SECURITY CONSIDERATIONS

- **Environment Variables**: MinIO credentials in `.env.local` (not committed)
- **File Upload**: Size limits (10MB) and type validation
- **Data URLs**: Secure handling of edited photos
- **Public Access**: MinIO bucket configured for public read

## 🎯 RULE COMPLIANCE CHECK

Before starting ANY task, verify:
- [ ] ✅ I acknowledge all critical rules above
- [ ] Files go in proper Next.js structure (not root)
- [ ] Use Task agents for >30 second operations
- [ ] TodoWrite for 3+ step tasks
- [ ] Commit after each completed task
- [ ] Preserve MinIO photo functionality

---

**🎯 Template integrated by Chang Ho Chien | HC AI 說人話channel | v1.0.0**  
📺 Tutorial: https://youtu.be/8Q1bRZaHH24

**⚠️ Prevention is better than consolidation - build clean from the start.**  
**🎯 Focus on single source of truth and extending existing functionality.**  
**📈 Each task should maintain clean architecture and prevent technical debt.**
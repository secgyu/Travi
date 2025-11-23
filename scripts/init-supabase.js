#!/usr/bin/env node

/**
 * Supabase 스키마 초기화 스크립트
 * 
 * 사용법:
 * 1. .env 파일에 Supabase 정보 설정:
 *    NEXT_PUBLIC_SUPABASE_URL=your-project-url
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 *    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 * 
 * 2. 스크립트 실행:
 *    node scripts/init-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function initializeSchema() {
  console.log('🚀 Starting Supabase schema initialization...\n');

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, '../supabase/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📄 Schema file loaded successfully');

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements\n`);

    // Execute each statement
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      
      // Skip comments
      if (statement.startsWith('--')) {
        continue;
      }

      try {
        // Extract table/function name for better logging
        let entityName = 'unknown';
        if (statement.includes('CREATE TABLE')) {
          const match = statement.match(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?(\S+)/i);
          entityName = match ? match[1] : 'unknown';
        } else if (statement.includes('CREATE INDEX')) {
          const match = statement.match(/CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF NOT EXISTS\s+)?(\S+)/i);
          entityName = match ? match[1] : 'unknown';
        } else if (statement.includes('CREATE FUNCTION') || statement.includes('CREATE OR REPLACE FUNCTION')) {
          const match = statement.match(/FUNCTION\s+(\S+)/i);
          entityName = match ? match[1] : 'unknown';
        } else if (statement.includes('CREATE TRIGGER')) {
          const match = statement.match(/CREATE TRIGGER\s+(\S+)/i);
          entityName = match ? match[1] : 'unknown';
        } else if (statement.includes('CREATE POLICY')) {
          const match = statement.match(/CREATE POLICY\s+"([^"]+)"/i);
          entityName = match ? match[1] : 'unknown';
        } else if (statement.includes('CREATE VIEW') || statement.includes('CREATE OR REPLACE VIEW')) {
          const match = statement.match(/VIEW\s+(\S+)/i);
          entityName = match ? match[1] : 'unknown';
        }

        const { error } = await supabase.rpc('exec_sql', { sql: statement });

        if (error) {
          // Some errors are acceptable (e.g., already exists)
          if (error.message.includes('already exists')) {
            console.log(`⚠️  ${entityName} already exists, skipping...`);
          } else {
            console.error(`❌ Error executing statement for ${entityName}:`, error.message);
            errorCount++;
          }
        } else {
          console.log(`✅ Successfully executed: ${entityName}`);
          successCount++;
        }
      } catch (error) {
        console.error(`❌ Error:`, error.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(50) + '\n');

    if (errorCount === 0) {
      console.log('🎉 Schema initialization completed successfully!');
    } else {
      console.log('⚠️  Schema initialization completed with some errors.');
      console.log('   Please check the errors above and run the SQL statements manually if needed.');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Alternative: Direct SQL execution via Supabase SQL Editor
function generateSQLInstructions() {
  console.log('\n' + '='.repeat(70));
  console.log('📋 MANUAL SETUP INSTRUCTIONS');
  console.log('='.repeat(70));
  console.log('\nSupabase CLI를 사용한 마이그레이션 (권장):');
  console.log('1. Supabase CLI 설치:');
  console.log('   npm install -g supabase');
  console.log('\n2. 프로젝트 링크:');
  console.log('   supabase link --project-ref your-project-ref');
  console.log('\n3. 마이그레이션 실행:');
  console.log('   supabase db push');
  console.log('\n' + '-'.repeat(70));
  console.log('\n또는 Supabase Dashboard에서 직접 실행:');
  console.log('1. Supabase Dashboard 접속');
  console.log('2. SQL Editor 메뉴 선택');
  console.log('3. supabase/schema.sql 파일의 내용을 복사하여 붙여넣기');
  console.log('4. Run 버튼 클릭');
  console.log('\n' + '='.repeat(70) + '\n');
}

// Run initialization
console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║              Travi Supabase Schema Initializer               ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

generateSQLInstructions();

// Note: Direct SQL execution via RPC might not be available
// Use Supabase CLI or Dashboard for schema initialization
console.log('⚠️  Note: This script provides instructions for manual setup.');
console.log('    Supabase에서는 보안상의 이유로 직접 SQL 실행이 제한될 수 있습니다.');
console.log('    위의 Manual Setup Instructions를 따라주세요.\n');









#!/usr/bin/env node

/**
 * Supabase 샘플 데이터 시드 스크립트
 * 
 * 사용법:
 * node scripts/seed-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

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

async function seedData() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // 1. Create sample users
    console.log('👤 Creating sample users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      {
        email: 'test@example.com',
        name: '김여행',
        password: hashedPassword,
        provider: 'credentials',
        bio: '여행을 좋아하는 개발자입니다.'
      },
      {
        email: 'traveler@example.com',
        name: '이세계',
        password: hashedPassword,
        provider: 'credentials',
        bio: '세계여행이 꿈입니다.'
      }
    ];

    const { data: createdUsers, error: usersError } = await supabase
      .from('users')
      .upsert(users, { onConflict: 'email' })
      .select();

    if (usersError) {
      console.error('❌ Error creating users:', usersError);
    } else {
      console.log(`✅ Created ${createdUsers.length} users`);
    }

    // 2. Create sample travel plans
    if (createdUsers && createdUsers.length > 0) {
      console.log('\n✈️  Creating sample travel plans...');
      
      const travelPlans = [
        {
          user_id: createdUsers[0].id,
          title: '도쿄 3일 여행',
          destination: '도쿄, 일본',
          start_date: '2025-03-15',
          end_date: '2025-03-17',
          budget: 1500000,
          currency: 'KRW',
          travel_style: ['맛집투어', '관광', '쇼핑'],
          companions: '친구',
          status: 'planning',
          is_public: true,
          itinerary: [
            {
              day: 1,
              activities: [
                {
                  time: '09:00',
                  title: '시부야 스크램블 교차로',
                  type: '관광',
                  duration: '1시간'
                },
                {
                  time: '13:00',
                  title: '이치란 라멘',
                  type: '식사',
                  duration: '1시간'
                }
              ]
            }
          ]
        },
        {
          user_id: createdUsers[0].id,
          title: '파리 5일 일정',
          destination: '파리, 프랑스',
          start_date: '2025-05-01',
          end_date: '2025-05-05',
          budget: 3000000,
          currency: 'KRW',
          travel_style: ['관광', '맛집투어'],
          companions: '커플',
          status: 'planning',
          is_public: true
        }
      ];

      const { data: createdPlans, error: plansError } = await supabase
        .from('travel_plans')
        .insert(travelPlans)
        .select();

      if (plansError) {
        console.error('❌ Error creating travel plans:', plansError);
      } else {
        console.log(`✅ Created ${createdPlans.length} travel plans`);

        // 3. Create budget items for the first plan
        if (createdPlans.length > 0) {
          console.log('\n💰 Creating sample budget items...');
          
          const budgetItems = [
            {
              travel_plan_id: createdPlans[0].id,
              category: '항공',
              name: '인천-나리타 왕복',
              amount: 450000,
              currency: 'KRW',
              icon: 'Plane',
              color: 'bg-blue-500'
            },
            {
              travel_plan_id: createdPlans[0].id,
              category: '숙박',
              name: '신주쿠 호텔 (3박)',
              amount: 400000,
              currency: 'KRW',
              icon: 'Hotel',
              color: 'bg-purple-500'
            },
            {
              travel_plan_id: createdPlans[0].id,
              category: '식비',
              name: '식사 및 간식',
              amount: 300000,
              currency: 'KRW',
              icon: 'Utensils',
              color: 'bg-green-500'
            },
            {
              travel_plan_id: createdPlans[0].id,
              category: '교통',
              name: 'JR패스 및 지하철',
              amount: 150000,
              currency: 'KRW',
              icon: 'Train',
              color: 'bg-orange-500'
            },
            {
              travel_plan_id: createdPlans[0].id,
              category: '쇼핑',
              name: '기념품 및 쇼핑',
              amount: 200000,
              currency: 'KRW',
              icon: 'ShoppingBag',
              color: 'bg-pink-500'
            }
          ];

          const { data: createdItems, error: itemsError } = await supabase
            .from('budget_items')
            .insert(budgetItems)
            .select();

          if (itemsError) {
            console.error('❌ Error creating budget items:', itemsError);
          } else {
            console.log(`✅ Created ${createdItems.length} budget items`);
          }
        }
      }

      // 4. Create sample saved guides
      console.log('\n📚 Creating sample saved guides...');
      
      const savedGuides = [
        {
          user_id: createdUsers[0].id,
          guide_slug: 'japan-visa',
          title: '일본 비자 신청 가이드',
          category: '비자'
        },
        {
          user_id: createdUsers[0].id,
          guide_slug: 'tokyo-subway',
          title: '도쿄 지하철 완전정복',
          category: '교통'
        }
      ];

      const { data: createdGuides, error: guidesError } = await supabase
        .from('saved_guides')
        .insert(savedGuides)
        .select();

      if (guidesError) {
        console.error('❌ Error creating saved guides:', guidesError);
      } else {
        console.log(`✅ Created ${createdGuides.length} saved guides`);
      }

      // 5. Create sample saved cities
      console.log('\n🌆 Creating sample saved cities...');
      
      const savedCities = [
        {
          user_id: createdUsers[0].id,
          city_slug: 'tokyo',
          city_name: '도쿄'
        },
        {
          user_id: createdUsers[0].id,
          city_slug: 'paris',
          city_name: '파리'
        },
        {
          user_id: createdUsers[0].id,
          city_slug: 'newyork',
          city_name: '뉴욕'
        }
      ];

      const { data: createdCities, error: citiesError } = await supabase
        .from('saved_cities')
        .insert(savedCities)
        .select();

      if (citiesError) {
        console.error('❌ Error creating saved cities:', citiesError);
      } else {
        console.log(`✅ Created ${createdCities.length} saved cities`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Sample credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run seeding
console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║                Travi Database Seeder                          ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

seedData().then(() => {
  console.log('\n✨ All done!');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 Seeding failed:', error);
  process.exit(1);
});









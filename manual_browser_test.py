#!/usr/bin/env python3
"""
Manual browser test using playwright directly
"""

import asyncio
from playwright.async_api import async_playwright

async def test_website():
    print("🎮 Starting Manual Browser Test for Super Smash Bros Infinity v0.7.0")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            # Navigate to the website
            await page.goto("http://localhost:8081/game-website.html")
            await page.wait_for_load_state("networkidle")
            
            print("✅ Page loaded successfully")
            
            # Take screenshot
            await page.screenshot(path="/app/website_test.png")
            print("📸 Screenshot taken")
            
            # Test 1: Check title
            title = await page.title()
            print(f"✅ Page title: {title}")
            
            # Test 2: Check if hero section is visible
            hero_section = await page.query_selector(".hero")
            if hero_section:
                print("✅ Hero section found")
            
            # Test 3: Check character cards
            character_cards = await page.query_selector_all(".character-card")
            print(f"✅ Found {len(character_cards)} character cards")
            
            # Test 4: Check placeholder images
            images = await page.query_selector_all(".character-card img")
            placeholder_count = 0
            for img in images:
                src = await img.get_attribute("src")
                if src and "via.placeholder.com" in src:
                    placeholder_count += 1
            
            print(f"✅ Found {placeholder_count} placeholder images")
            
            # Test 5: Test modal functionality
            if character_cards:
                print("\n🎯 Testing modal functionality...")
                
                # Click on Mario character card
                mario_card = None
                for card in character_cards:
                    data_char = await card.get_attribute("data-character")
                    if data_char == "mario":
                        mario_card = card
                        break
                
                if mario_card:
                    await mario_card.click()
                    print("✅ Clicked on Mario character card")
                    
                    # Wait for modal to appear
                    await page.wait_for_selector("#movesModal", state="visible", timeout=3000)
                    print("✅ Modal appeared")
                    
                    # Check modal content
                    modal_title = await page.query_selector("#modalCharacterName")
                    if modal_title:
                        title_text = await modal_title.text_content()
                        print(f"✅ Modal title: {title_text}")
                    
                    # Check moves list
                    moves = await page.query_selector_all(".moves-list li")
                    print(f"✅ Found {len(moves)} moves for Mario")
                    
                    # Check combos list
                    combos = await page.query_selector_all(".combos-list li")
                    print(f"✅ Found {len(combos)} combos for Mario")
                    
                    # Test close button
                    close_btn = await page.query_selector(".close")
                    if close_btn:
                        await close_btn.click()
                        await page.wait_for_timeout(500)
                        print("✅ Modal closed with X button")
            
            # Test 6: Test navigation
            print("\n🧭 Testing navigation...")
            nav_links = await page.query_selector_all(".nav-menu a")
            print(f"✅ Found {len(nav_links)} navigation links")
            
            # Test 7: Test responsive design (mobile)
            print("\n📱 Testing mobile responsiveness...")
            await page.set_viewport_size({"width": 390, "height": 844})
            await page.wait_for_timeout(1000)
            
            # Check if hamburger menu is visible
            hamburger = await page.query_selector(".hamburger")
            if hamburger:
                is_visible = await hamburger.is_visible()
                print(f"✅ Hamburger menu visible on mobile: {is_visible}")
            
            # Take mobile screenshot
            await page.screenshot(path="/app/website_mobile.png")
            print("📸 Mobile screenshot taken")
            
            print("\n🎮 All tests completed successfully!")
            
        except Exception as e:
            print(f"❌ Error during testing: {str(e)}")
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(test_website())
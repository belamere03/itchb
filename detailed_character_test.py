#!/usr/bin/env python3
"""
Detailed character testing for specific characters mentioned in the review
"""

import asyncio
from playwright.async_api import async_playwright

async def test_specific_characters():
    print("🎮 Testing Specific Characters from Review")
    print("=" * 60)
    
    # Characters specifically mentioned in the review
    review_characters = ['kirby', 'naruto', 'goku', 'pikachu', 'link', 'megaman', 
                        'scratch-cat', 'impostor', 'ness', 'hat-kid', 'sora', 'reimu']
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            await page.goto("http://localhost:8081/game-website.html")
            await page.wait_for_load_state("networkidle")
            
            print("✅ Page loaded successfully")
            
            # Test each character
            for char_name in review_characters:
                print(f"\n🎯 Testing {char_name.title()}...")
                
                # Find character card
                char_card = await page.query_selector(f'[data-character="{char_name}"]')
                if char_card:
                    print(f"✅ {char_name.title()} character card found")
                    
                    # Test hover effect
                    await char_card.hover()
                    await page.wait_for_timeout(500)
                    print(f"✅ {char_name.title()} hover effect applied")
                    
                    # Click to open modal
                    await char_card.click()
                    
                    try:
                        # Wait for modal
                        await page.wait_for_selector("#movesModal", state="visible", timeout=2000)
                        
                        # Check modal title
                        modal_title = await page.query_selector("#modalCharacterName")
                        if modal_title:
                            title_text = await modal_title.text_content()
                            print(f"✅ {char_name.title()} modal opened: {title_text}")
                        
                        # Check moves
                        moves = await page.query_selector_all(".moves-list li")
                        combos = await page.query_selector_all(".combos-list li")
                        print(f"✅ {char_name.title()} has {len(moves)} moves and {len(combos)} combos")
                        
                        # Close modal
                        close_btn = await page.query_selector(".close")
                        if close_btn:
                            await close_btn.click()
                            await page.wait_for_timeout(300)
                        
                    except Exception as e:
                        print(f"❌ {char_name.title()} modal test failed: {str(e)}")
                
                else:
                    print(f"❌ {char_name.title()} character card not found")
            
            # Test "And 4 More!" card
            print(f"\n🎯 Testing 'And 4 More!' card...")
            more_card = await page.query_selector('[data-character="more"]')
            if more_card:
                print("✅ 'And 4 More!' card found")
                await more_card.click()
                
                try:
                    await page.wait_for_selector("#movesModal", state="visible", timeout=2000)
                    modal_title = await page.query_selector("#modalCharacterName")
                    if modal_title:
                        title_text = await modal_title.text_content()
                        print(f"✅ 'And 4 More!' modal opened: {title_text}")
                    
                    # Close modal
                    close_btn = await page.query_selector(".close")
                    if close_btn:
                        await close_btn.click()
                        await page.wait_for_timeout(300)
                        
                except Exception as e:
                    print(f"❌ 'And 4 More!' modal test failed: {str(e)}")
            
            # Test ESC key to close modal
            print(f"\n🎯 Testing ESC key modal close...")
            mario_card = await page.query_selector('[data-character="mario"]')
            if mario_card:
                await mario_card.click()
                await page.wait_for_selector("#movesModal", state="visible", timeout=2000)
                print("✅ Modal opened for ESC test")
                
                # Press ESC key
                await page.keyboard.press("Escape")
                await page.wait_for_timeout(500)
                
                # Check if modal is closed
                modal = await page.query_selector("#movesModal")
                if modal:
                    display = await modal.evaluate("el => getComputedStyle(el).display")
                    if display == "none":
                        print("✅ ESC key closes modal successfully")
                    else:
                        print("❌ ESC key did not close modal")
            
            # Test clicking outside modal to close
            print(f"\n🎯 Testing click outside modal to close...")
            mario_card = await page.query_selector('[data-character="mario"]')
            if mario_card:
                await mario_card.click()
                await page.wait_for_selector("#movesModal", state="visible", timeout=2000)
                print("✅ Modal opened for outside click test")
                
                # Click on modal background (outside content)
                modal_bg = await page.query_selector("#movesModal")
                if modal_bg:
                    # Get modal content bounds to click outside it
                    modal_content = await page.query_selector(".modal-content")
                    if modal_content:
                        content_box = await modal_content.bounding_box()
                        # Click outside the content area
                        await page.click("#movesModal", position={"x": 10, "y": 10})
                        await page.wait_for_timeout(500)
                        
                        # Check if modal is closed
                        display = await modal_bg.evaluate("el => getComputedStyle(el).display")
                        if display == "none":
                            print("✅ Click outside closes modal successfully")
                        else:
                            print("❌ Click outside did not close modal")
            
            print("\n" + "=" * 60)
            print("🎮 Character testing completed!")
            
        except Exception as e:
            print(f"❌ Error during character testing: {str(e)}")
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(test_specific_characters())
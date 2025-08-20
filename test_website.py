#!/usr/bin/env python3
"""
Manual test script for Super Smash Bros Infinity v0.7.0 website
"""

import requests
from bs4 import BeautifulSoup
import re

def test_website():
    print("🎮 Testing Super Smash Bros Infinity v0.7.0 Website")
    print("=" * 60)
    
    base_url = "http://localhost:8081"
    
    try:
        # Test 1: Check if main HTML loads
        print("\n1. Testing main HTML file...")
        response = requests.get(f"{base_url}/game-website.html")
        if response.status_code == 200:
            print("✅ HTML file loads successfully")
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Check title
            title = soup.find('title')
            if title and "Super Smash Bros Infinity v0.7.0" in title.text:
                print("✅ Page title is correct")
            else:
                print("❌ Page title is incorrect or missing")
            
            # Check hero title
            hero_title = soup.find('h1', class_='hero-title')
            if hero_title:
                print("✅ Hero title found")
            else:
                print("❌ Hero title not found")
            
            # Check navigation menu
            nav_items = soup.find_all('a', href=re.compile(r'^#'))
            print(f"✅ Found {len(nav_items)} navigation items")
            
            # Check character cards
            character_cards = soup.find_all('div', class_='character-card')
            print(f"✅ Found {len(character_cards)} character cards")
            
            # Check placeholder images
            placeholder_images = soup.find_all('img', src=re.compile(r'via\.placeholder\.com'))
            print(f"✅ Found {len(placeholder_images)} placeholder images")
            
            # List some character names
            character_names = []
            for card in character_cards[:10]:  # First 10 characters
                h3 = card.find('h3')
                if h3:
                    character_names.append(h3.text.strip())
            
            print(f"✅ Character names found: {', '.join(character_names)}")
            
        else:
            print(f"❌ HTML file failed to load: {response.status_code}")
            return False
        
        # Test 2: Check CSS file
        print("\n2. Testing CSS file...")
        css_response = requests.get(f"{base_url}/game-styles.css")
        if css_response.status_code == 200:
            print("✅ CSS file loads successfully")
            if ".character-card" in css_response.text:
                print("✅ CSS contains character card styles")
            if ".modal" in css_response.text:
                print("✅ CSS contains modal styles")
        else:
            print(f"❌ CSS file failed to load: {css_response.status_code}")
        
        # Test 3: Check JavaScript file
        print("\n3. Testing JavaScript file...")
        js_response = requests.get(f"{base_url}/game-script.js")
        if js_response.status_code == 200:
            print("✅ JavaScript file loads successfully")
            if "characterMoves" in js_response.text:
                print("✅ JavaScript contains character moves data")
            if "showCharacterMoves" in js_response.text:
                print("✅ JavaScript contains modal functions")
        else:
            print(f"❌ JavaScript file failed to load: {js_response.status_code}")
        
        # Test 4: Check specific characters mentioned in the review
        print("\n4. Testing specific characters from review...")
        review_characters = ['kirby', 'naruto', 'goku', 'pikachu', 'link', 'megaman', 
                           'scratch-cat', 'impostor', 'ness', 'hat-kid', 'sora', 'reimu']
        
        found_characters = []
        for char in review_characters:
            if f'data-character="{char}"' in response.text:
                found_characters.append(char)
        
        print(f"✅ Found {len(found_characters)}/{len(review_characters)} review characters")
        print(f"   Characters found: {', '.join(found_characters)}")
        
        # Test 5: Check moveset data in JavaScript
        print("\n5. Testing character movesets...")
        moveset_count = 0
        for char in found_characters:
            if f'"{char}":' in js_response.text:
                moveset_count += 1
        
        print(f"✅ Found movesets for {moveset_count}/{len(found_characters)} characters")
        
        print("\n" + "=" * 60)
        print("🎮 Website testing completed!")
        return True
        
    except Exception as e:
        print(f"❌ Error during testing: {str(e)}")
        return False

if __name__ == "__main__":
    test_website()
import google.generativeai as genai
import speech_recognition as sr
import pyttsx3
import time

# ✅ Step 1: Configure Gemini API
genai.configure(api_key="AIzaSyBPQ5BQZI08KtFZCLyxQIsPOGDl2-WjlEk")
model = genai.GenerativeModel("gemini-pro")

# ✅ Step 2: Text-to-Speech init
engine = pyttsx3.init()
engine.setProperty('rate', 160)

# ✅ Step 3: Speech-to-Text init
r = sr.Recognizer()
mic = sr.Microphone()

print("🎙️ AI Assistant started. Speak something...")

# ✅ Step 4: Continuous Listening
while True:
    with mic as source:
        r.adjust_for_ambient_noise(source)
        print("\nListening...")
        try:
            audio = r.listen(source, timeout=10)
            user_input = r.recognize_google(audio)
            print("You:", user_input)
        except sr.WaitTimeoutError:
            continue
        except sr.UnknownValueError:
            print("❌ Could not understand. Try again.")
            continue
        except Exception as e:
            print("Error:", e)
            continue

    # ✅ Gemini AI se reply
    try:
        response = model.generate_content(user_input)
        bot_reply = response.text.strip()
        print("🤖 AI:", bot_reply)
        engine.say(bot_reply)
        engine.runAndWait()
    except Exception as e:
        print("⚠️ Gemini Error:", e)
        engine.say("Sorry, I could not answer that.")
        engine.runAndWait()

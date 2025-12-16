// ========================================
// MENTAL HEALTH ASSISTANT WITH MOOD UPLIFT
// Enhanced with WHO Guidelines, Bilingual Support & Sound Effects
// ========================================

// Audio Context for sound effects
let audioContext = null;
let selectedLanguage = null;

// Initialize Audio Context (user interaction required)
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Play soft beep sound
function playSoftBeep(frequency = 440, duration = 0.15) {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Play timer beep (double beep)
function playTimerBeep() {
    playSoftBeep(520, 0.12);
    setTimeout(() => playSoftBeep(520, 0.12), 150);
}

// Play countdown beep
function playCountBeep(count) {
    const frequency = count <= 3 ? 600 : 480;
    playSoftBeep(frequency, 0.15);
}

// Play completion chime
function playCompletionChime() {
    playSoftBeep(523, 0.15); // C
    setTimeout(() => playSoftBeep(659, 0.15), 120); // E
    setTimeout(() => playSoftBeep(784, 0.2), 240); // G
}

// Language Selection
function selectLanguage(lang) {
    selectedLanguage = lang;
    initAudioContext();
    playSoftBeep(520, 0.15);
    
    document.getElementById('languageScreen').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'flex';
    
    // Update header text
    const translations = getTranslations();
    document.getElementById('headerTitle').textContent = translations.headerTitle;
    document.getElementById('headerSubtitle').textContent = translations.headerSubtitle;
    
    setTimeout(() => {
        startApp();
    }, 500);
}

// Translation Object
function getTranslations() {
    const translations = {
        en: {
            headerTitle: "Mental Health Assistant [Manosakha]",
            headerSubtitle: "Answer a few questions to assess your mental wellbeing",
            greeting1: "Hi there! I'm here to check in with you. This will take just a few minutes.",
            greeting2: "Remember, I'm not a therapist, just a supportive tool. Your answers are private.",
            analyzing: "Thank you for sharing. Let me process your responses...",
            scoreLabel: "Your Wellbeing Score",
            outOf: "out of 10",
            positive: "It sounds like you're doing pretty well overall! That's great to hear.",
            positiveAdvice: "Keep taking care of yourself. Remember, it's okay to reach out if things change.",
            neutral: "It sounds like you're managing, but things might feel a bit challenging right now.",
            neutralQuestion: "That's completely normal. Would you like some quick techniques that might help you feel a bit better?",
            lowMood: "Based on your responses, it seems like today might be a bit heavy.",
            lowMoodQuestion: "This isn't a diagnosis, but would you like to try a quick mood-uplifting activity? It might help you feel a little lighter.",
            yesTry: "Yes, let's try something",
            noThanks: "No thanks, I'm okay",
            upliftMenu: "Great! Pick what feels right for you right now:",
            breathing: "🫁 Breathing exercise (1 min)",
            grounding: "🌍 Grounding technique (2 min)",
            gratitude: "✨ Quick gratitude prompt",
            reset: "💧 Simple reset (stretch/water)",
            breathingIntro1: "Let's do this together. Find a comfortable position.",
            breathingIntro2: "Close your eyes if you'd like, or keep them on the screen.",
            breathingIntro3: "We'll do 4 breathing cycles together. Listen for the gentle beeps.",
            breathingComplete: "Wonderful. You did it. Take a moment to notice how you feel.",
            groundingIntro: "This is called the 5-4-3-2-1 technique. It helps you reconnect with the present moment.",
            groundingPrompts: [
                "Name 5 things you can SEE around you right now.",
                "Name 4 things you can FEEL (texture, temperature, your clothes, the chair...).",
                "Name 3 things you can HEAR right now.",
                "Name 2 things you can SMELL (or like the smell of).",
                "Name 1 thing you can TASTE (or recently tasted)."
            ],
            groundingComplete: "Well done. That's grounding. You're here, in this moment.",
            gratitudeIntro: "Let's try something small but powerful.",
            gratitudePrompt: "Can you name ONE small thing that didn't go wrong today?",
            gratitudeResponse: "That's good. Sometimes noticing what's okay helps more than we think.",
            resetSteps: [
                "Let's do a quick physical reset.",
                "Stand up if you can (or just sit up straighter).",
                "Roll your shoulders back 3 times.",
                "Stretch your arms above your head.",
                "Take a deep breath in and out.",
                "Take a sip of water if you have any nearby.",
                "Done. Small resets matter."
            ],
            followUp: "How are you feeling now?",
            better: "A bit better",
            same: "About the same",
            notHelping: "Not really helping",
            betterResponse: "That's great to hear. Take care of yourself.",
            sameResponse: "That's okay too. These things take time. Would you like to try something else?",
            notHelpingResponse: "I understand. It's okay if this doesn't feel right for you right now.",
            showOther: "Yes, show me other options",
            done: "No, I'm done for now",
            disclaimer: "Just so you know: these activities are meant to support your mood in the moment. They're not a substitute for professional care.\n\nIf low mood continues, please consider talking to a qualified healthcare professional.",
            gotIt: "Got it, thanks",
            showResources: "Show me resources",
            resources: "Here are some resources that might help:",
            finalQuestion: "Is there anything else I can help with?",
            restart: "Restart assessment",
            goodbye: "I'm done, thank you",
            goodbyeMessage: "Take care of yourself. You matter. 💜",
            breathIn: "Breathe In",
            breathOut: "Breathe Out",
            hold: "Hold",
            ready: "Ready",
            complete: "Complete",
            questionOf: "Question",
            of: "of",
            send: "Send",
            typePlaceholder: "Type your response here..."
        },
        hi: {
            headerTitle: "मानसिक स्वास्थ्य सहायक [मनोसखा]",
            headerSubtitle: "अपनी मानसिक भलाई का आकलन करने के लिए कुछ प्रश्नों के उत्तर दें",
            greeting1: "नमस्ते! मैं यहां आपसे बात करने के लिए हूं। इसमें कुछ ही मिनट लगेंगे।",
            greeting2: "याद रखें, मैं थेरेपिस्ट नहीं हूं, बस एक सहायक उपकरण हूं। आपके उत्तर निजी हैं।",
            analyzing: "साझा करने के लिए धन्यवाद। मैं आपकी प्रतिक्रियाओं को समझ रहा हूं...",
            scoreLabel: "आपका स्वास्थ्य स्कोर",
            outOf: "में से 10",
            positive: "ऐसा लगता है कि आप समग्र रूप से बहुत अच्छा कर रहे हैं! यह सुनना बहुत अच्छा है।",
            positiveAdvice: "अपना ख्याल रखते रहें। याद रखें, अगर चीजें बदलती हैं तो संपर्क करना ठीक है।",
            neutral: "ऐसा लगता है कि आप संभाल रहे हैं, लेकिन चीजें थोड़ी चुनौतीपूर्ण लग सकती हैं।",
            neutralQuestion: "यह बिल्कुल सामान्य है। क्या आप कुछ त्वरित तकनीकें आज़माना चाहेंगे जो आपको बेहतर महसूस करने में मदद कर सकती हैं?",
            lowMood: "आपकी प्रतिक्रियाओं के आधार पर, ऐसा लगता है कि आज का दिन थोड़ा भारी है।",
            lowMoodQuestion: "यह निदान नहीं है, लेकिन क्या आप एक त्वरित मूड बेहतर करने वाली गतिविधि आज़माना चाहेंगे? इससे आपको थोड़ा हल्का महसूस करने में मदद मिल सकती है।",
            yesTry: "हां, कुछ करके देखते हैं",
            noThanks: "नहीं, धन्यवाद, मैं ठीक हूं",
            upliftMenu: "बढ़िया! चुनें कि अभी आपके लिए क्या सही है:",
            breathing: "🫁 श्वास व्यायाम (1 मिनट)",
            grounding: "🌍 ग्राउंडिंग तकनीक (2 मिनट)",
            gratitude: "✨ त्वरित आभार अभ्यास",
            reset: "💧 सरल रीसेट (स्ट्रेच/पानी)",
            breathingIntro1: "चलिए एक साथ करते हैं। एक आरामदायक स्थिति में बैठें।",
            breathingIntro2: "यदि आप चाहें तो अपनी आंखें बंद करें, या स्क्रीन पर रखें।",
            breathingIntro3: "हम एक साथ 4 श्वास चक्र करेंगे। धीमी बीप सुनें।",
            breathingComplete: "शानदार। आपने कर दिया। एक पल के लिए ध्यान दें कि आप कैसा महसूस कर रहे हैं।",
            groundingIntro: "इसे 5-4-3-2-1 तकनीक कहा जाता है। यह आपको वर्तमान क्षण से फिर से जुड़ने में मदद करता है।",
            groundingPrompts: [
                "अभी अपने आसपास 5 चीजें बताएं जो आप देख सकते हैं।",
                "4 चीजें बताएं जो आप महसूस कर सकते हैं (बनावट, तापमान, आपके कपड़े, कुर्सी...)।",
                "अभी 3 चीजें बताएं जो आप सुन सकते हैं।",
                "2 चीजें बताएं जिनकी खुशबू आप ले सकते हैं (या जिसकी खुशबू आपको पसंद है)।",
                "1 चीज बताएं जो आप चख सकते हैं (या हाल ही में चखी है)।"
            ],
            groundingComplete: "बहुत अच्छा। यही ग्राउंडिंग है। आप यहां हैं, इस क्षण में।",
            gratitudeIntro: "चलिए कुछ छोटा लेकिन शक्तिशाली करते हैं।",
            gratitudePrompt: "क्या आप एक छोटी सी चीज बता सकते हैं जो आज गलत नहीं हुई?",
            gratitudeResponse: "यह अच्छा है। कभी-कभी जो ठीक है उस पर ध्यान देना हमारी सोच से ज्यादा मदद करता है।",
            resetSteps: [
                "चलिए एक त्वरित शारीरिक रीसेट करते हैं।",
                "यदि आप कर सकते हैं तो खड़े हो जाएं (या बस सीधे बैठें)।",
                "अपने कंधों को 3 बार पीछे घुमाएं।",
                "अपनी बाहों को अपने सिर के ऊपर फैलाएं।",
                "गहरी सांस अंदर और बाहर लें।",
                "यदि पास में पानी है तो एक घूंट लें।",
                "हो गया। छोटे रीसेट मायने रखते हैं।"
            ],
            followUp: "अब आप कैसा महसूस कर रहे हैं?",
            better: "थोड़ा बेहतर",
            same: "लगभग वैसा ही",
            notHelping: "वास्तव में मदद नहीं कर रहा",
            betterResponse: "यह सुनना बहुत अच्छा है। अपना ख्याल रखें।",
            sameResponse: "यह भी ठीक है। इन चीजों में समय लगता है। क्या आप कुछ और आज़माना चाहेंगे?",
            notHelpingResponse: "मैं समझता हूं। अगर यह अभी आपके लिए सही नहीं लगता तो यह ठीक है।",
            showOther: "हां, मुझे अन्य विकल्प दिखाएं",
            done: "नहीं, मैं अभी के लिए कर चुका हूं",
            disclaimer: "बस बता दूं: ये गतिविधियां क्षण में आपके मूड को सपोर्ट करने के लिए हैं। ये पेशेवर देखभाल का विकल्प नहीं हैं।\n\nयदि कम मूड जारी रहता है, तो कृपया किसी योग्य स्वास्थ्य पेशेवर से बात करने पर विचार करें।",
            gotIt: "समझ गया, धन्यवाद",
            showResources: "मुझे संसाधन दिखाएं",
            resources: "यहां कुछ संसाधन हैं जो मदद कर सकते हैं:",
            finalQuestion: "क्या कुछ और है जिसमें मैं मदद कर सकता हूं?",
            restart: "मूल्यांकन फिर से शुरू करें",
            goodbye: "बस, धन्यवाद",
            goodbyeMessage: "अपना ख्याल रखें। आप महत्वपूर्ण हैं। 💜",
            breathIn: "सांस अंदर",
            breathOut: "सांस बाहर",
            hold: "रुकें",
            ready: "तैयार",
            complete: "पूर्ण",
            questionOf: "प्रश्न",
            of: "में से",
            send: "भेजें",
            typePlaceholder: "अपना जवाब यहां लिखें..."
        }
    };
    
    return translations[selectedLanguage];
}

// 25 WHO-Based Mental Health Questions (Bilingual)
const allQuestions = [
    {
        en: "How have you been feeling overall this week?",
        hi: "इस सप्ताह आप समग्र रूप से कैसा महसूस कर रहे हैं?",
        options: {
            en: [
                { text: "Pretty good, no major complaints", score: 2 },
                { text: "Up and down, but managing", score: 1 },
                { text: "Not great, struggling a bit", score: 0 }
            ],
            hi: [
                { text: "बहुत अच्छा, कोई बड़ी शिकायत नहीं", score: 2 },
                { text: "कभी अच्छा कभी बुरा, लेकिन संभाल रहा हूं", score: 1 },
                { text: "बहुत अच्छा नहीं, थोड़ा संघर्ष कर रहा हूं", score: 0 }
            ]
        }
    },
    {
        en: "How's your energy level been?",
        hi: "आपकी ऊर्जा का स्तर कैसा रहा है?",
        options: {
            en: [
                { text: "Good, I feel motivated", score: 2 },
                { text: "Low at times, but okay", score: 1 },
                { text: "Very low, hard to get going", score: 0 }
            ],
            hi: [
                { text: "अच्छा, मैं प्रेरित महसूस करता हूं", score: 2 },
                { text: "कभी-कभी कम, लेकिन ठीक है", score: 1 },
                { text: "बहुत कम, शुरू करना मुश्किल है", score: 0 }
            ]
        }
    },
    {
        en: "Have you felt overwhelmed recently?",
        hi: "क्या आपने हाल ही में अभिभूत महसूस किया है?",
        options: {
            en: [
                { text: "Not really", score: 2 },
                { text: "Sometimes", score: 1 },
                { text: "Yes, frequently", score: 0 }
            ],
            hi: [
                { text: "वास्तव में नहीं", score: 2 },
                { text: "कभी-कभी", score: 1 },
                { text: "हां, अक्सर", score: 0 }
            ]
        }
    },
    {
        en: "How's your sleep been?",
        hi: "आपकी नींद कैसी रही है?",
        options: {
            en: [
                { text: "Sleeping fine", score: 2 },
                { text: "Some trouble, but manageable", score: 1 },
                { text: "Really struggling with sleep", score: 0 }
            ],
            hi: [
                { text: "अच्छी नींद आ रही है", score: 2 },
                { text: "कुछ परेशानी, लेकिन संभाल रहा हूं", score: 1 },
                { text: "नींद के साथ वास्तव में संघर्ष कर रहा हूं", score: 0 }
            ]
        }
    },
    {
        en: "Do you feel like you have support when you need it?",
        hi: "क्या आपको लगता है कि जरूरत पड़ने पर आपको सहायता मिलती है?",
        options: {
            en: [
                { text: "Yes, I have people I can talk to", score: 2 },
                { text: "Sometimes, not always", score: 1 },
                { text: "Not really, I feel alone", score: 0 }
            ],
            hi: [
                { text: "हां, मेरे पास बात करने वाले लोग हैं", score: 2 },
                { text: "कभी-कभी, हमेशा नहीं", score: 1 },
                { text: "वास्तव में नहीं, मैं अकेला महसूस करता हूं", score: 0 }
            ]
        }
    },
    {
        en: "How often do you feel sad or down?",
        hi: "आप कितनी बार उदास या निराश महसूस करते हैं?",
        options: {
            en: [
                { text: "Rarely or never", score: 2 },
                { text: "Occasionally", score: 1 },
                { text: "Most of the time", score: 0 }
            ],
            hi: [
                { text: "शायद ही कभी या कभी नहीं", score: 2 },
                { text: "कभी-कभार", score: 1 },
                { text: "ज्यादातर समय", score: 0 }
            ]
        }
    },
    {
        en: "Are you able to concentrate on daily tasks?",
        hi: "क्या आप दैनिक कार्यों पर ध्यान केंद्रित कर पाते हैं?",
        options: {
            en: [
                { text: "Yes, no problem", score: 2 },
                { text: "Sometimes it's difficult", score: 1 },
                { text: "Very difficult to focus", score: 0 }
            ],
            hi: [
                { text: "हां, कोई समस्या नहीं", score: 2 },
                { text: "कभी-कभी मुश्किल होता है", score: 1 },
                { text: "ध्यान केंद्रित करना बहुत मुश्किल है", score: 0 }
            ]
        }
    },
    {
        en: "How do you feel about your future?",
        hi: "आप अपने भविष्य के बारे में कैसा महसूस करते हैं?",
        options: {
            en: [
                { text: "Hopeful and optimistic", score: 2 },
                { text: "Uncertain, but okay", score: 1 },
                { text: "Worried or hopeless", score: 0 }
            ],
            hi: [
                { text: "आशावान और सकारात्मक", score: 2 },
                { text: "अनिश्चित, लेकिन ठीक है", score: 1 },
                { text: "चिंतित या निराश", score: 0 }
            ]
        }
    },
    {
        en: "Do you feel anxious or worried often?",
        hi: "क्या आप अक्सर चिंतित या परेशान महसूस करते हैं?",
        options: {
            en: [
                { text: "Not really", score: 2 },
                { text: "Sometimes", score: 1 },
                { text: "Yes, very often", score: 0 }
            ],
            hi: [
                { text: "वास्तव में नहीं", score: 2 },
                { text: "कभी-कभी", score: 1 },
                { text: "हां, बहुत बार", score: 0 }
            ]
        }
    },
    {
        en: "Are you able to enjoy activities you usually like?",
        hi: "क्या आप उन गतिविधियों का आनंद ले पाते हैं जो आपको आमतौर पर पसंद हैं?",
        options: {
            en: [
                { text: "Yes, as usual", score: 2 },
                { text: "Less than before", score: 1 },
                { text: "Not at all", score: 0 }
            ],
            hi: [
                { text: "हां, हमेशा की तरह", score: 2 },
                { text: "पहले से कम", score: 1 },
                { text: "बिल्कुल नहीं", score: 0 }
            ]
        }
    },
    {
        en: "How comfortable do you feel in social situations?",
        hi: "सामाजिक परिस्थितियों में आप कितना सहज महसूस करते हैं?",
        options: {
            en: [
                { text: "Quite comfortable", score: 2 },
                { text: "A bit uncomfortable at times", score: 1 },
                { text: "Very uncomfortable", score: 0 }
            ],
            hi: [
                { text: "काफी सहज", score: 2 },
                { text: "कभी-कभी थोड़ा असहज", score: 1 },
                { text: "बहुत असहज", score: 0 }
            ]
        }
    },
    {
        en: "Do you feel valued and appreciated?",
        hi: "क्या आप मूल्यवान और सराहा हुआ महसूस करते हैं?",
        options: {
            en: [
                { text: "Yes, most of the time", score: 2 },
                { text: "Sometimes", score: 1 },
                { text: "Rarely or never", score: 0 }
            ],
            hi: [
                { text: "हां, ज्यादातर समय", score: 2 },
                { text: "कभी-कभी", score: 1 },
                { text: "शायद ही कभी या कभी नहीं", score: 0 }
            ]
        }
    },
    {
        en: "How well are you managing stress?",
        hi: "आप तनाव को कितनी अच्छी तरह से प्रबंधित कर रहे हैं?",
        options: {
            en: [
                { text: "Pretty well", score: 2 },
                { text: "It's challenging but manageable", score: 1 },
                { text: "I'm struggling to cope", score: 0 }
            ],
            hi: [
                { text: "बहुत अच्छी तरह से", score: 2 },
                { text: "चुनौतीपूर्ण है लेकिन संभाल रहा हूं", score: 1 },
                { text: "मैं सामना करने में संघर्ष कर रहा हूं", score: 0 }
            ]
        }
    },
    {
        en: "Do you have any physical symptoms like headaches or stomach issues?",
        hi: "क्या आपको सिरदर्द या पेट की समस्याओं जैसे कोई शारीरिक लक्षण हैं?",
        options: {
            en: [
                { text: "No, I feel fine physically", score: 2 },
                { text: "Occasionally", score: 1 },
                { text: "Yes, quite often", score: 0 }
            ],
            hi: [
                { text: "नहीं, मैं शारीरिक रूप से ठीक महसूस करता हूं", score: 2 },
                { text: "कभी-कभार", score: 1 },
                { text: "हां, काफी बार", score: 0 }
            ]
        }
    },
    {
        en: "How is your appetite?",
        hi: "आपकी भूख कैसी है?",
        options: {
            en: [
                { text: "Normal and healthy", score: 2 },
                { text: "Slightly changed", score: 1 },
                { text: "Much more or much less than usual", score: 0 }
            ],
            hi: [
                { text: "सामान्य और स्वस्थ", score: 2 },
                { text: "थोड़ा बदला हुआ", score: 1 },
                { text: "सामान्य से बहुत अधिक या बहुत कम", score: 0 }
            ]
        }
    },
    {
        en: "Do you feel like yourself lately?",
        hi: "क्या आप हाल ही में खुद जैसा महसूस कर रहे हैं?",
        options: {
            en: [
                { text: "Yes, mostly", score: 2 },
                { text: "Not entirely", score: 1 },
                { text: "Not at all", score: 0 }
            ],
            hi: [
                { text: "हां, ज्यादातर", score: 2 },
                { text: "पूरी तरह से नहीं", score: 1 },
                { text: "बिल्कुल नहीं", score: 0 }
            ]
        }
    },
    {
        en: "How often do you feel irritable or angry?",
        hi: "आप कितनी बार चिड़चिड़े या गुस्सैल महसूस करते हैं?",
        options: {
            en: [
                { text: "Rarely", score: 2 },
                { text: "Sometimes", score: 1 },
                { text: "Very often", score: 0 }
            ],
            hi: [
                { text: "शायद ही कभी", score: 2 },
                { text: "कभी-कभी", score: 1 },
                { text: "बहुत बार", score: 0 }
            ]
        }
    },
    {
        en: "Are you taking care of your basic needs (eating, hygiene, etc.)?",
        hi: "क्या आप अपनी बुनियादी जरूरतों (खाना, स्वच्छता आदि) का ध्यान रख रहे हैं?",
        options: {
            en: [
                { text: "Yes, consistently", score: 2 },
                { text: "Most of the time", score: 1 },
                { text: "It's been difficult", score: 0 }
            ],
            hi: [
                { text: "हां, लगातार", score: 2 },
                { text: "ज्यादातर समय", score: 1 },
                { text: "यह मुश्किल रहा है", score: 0 }
            ]
        }
    },
    {
        en: "Do you feel hopeful about things getting better?",
        hi: "क्या आपको लगता है कि चीजें बेहतर हो जाएंगी?",
        options: {
            en: [
                { text: "Yes, I'm hopeful", score: 2 },
                { text: "I'm not sure", score: 1 },
                { text: "No, I don't feel hopeful", score: 0 }
            ],
            hi: [
                { text: "हां, मुझे उम्मीद है", score: 2 },
                { text: "मुझे यकीन नहीं है", score: 1 },
                { text: "नहीं, मुझे उम्मीद नहीं है", score: 0 }
            ]
        }
    },
    {
        en: "How connected do you feel to others?",
        hi: "आप दूसरों से कितना जुड़ा हुआ महसूस करते हैं?",
        options: {
            en: [
                { text: "Very connected", score: 2 },
                { text: "Somewhat connected", score: 1 },
                { text: "Disconnected or isolated", score: 0 }
            ],
            hi: [
                { text: "बहुत जुड़ा हुआ", score: 2 },
                { text: "कुछ हद तक जुड़ा हुआ", score: 1 },
                { text: "अलग-थलग या अकेला", score: 0 }
            ]
        }
    },
    {
        en: "Are you experiencing any racing thoughts or inability to relax?",
        hi: "क्या आप तेजी से विचार या आराम न कर पाने का अनुभव कर रहे हैं?",
        options: {
            en: [
                { text: "No, I can relax fine", score: 2 },
                { text: "Occasionally", score: 1 },
                { text: "Yes, frequently", score: 0 }
            ],
            hi: [
                { text: "नहीं, मैं ठीक से आराम कर सकता हूं", score: 2 },
                { text: "कभी-कभार", score: 1 },
                { text: "हां, अक्सर", score: 0 }
            ]
        }
    },
    {
        en: "How do you feel about your accomplishments lately?",
        hi: "हाल ही में अपनी उपलब्धियों के बारे में आप कैसा महसूस करते हैं?",
        options: {
            en: [
                { text: "Satisfied and proud", score: 2 },
                { text: "Neutral", score: 1 },
                { text: "Disappointed or inadequate", score: 0 }
            ],
            hi: [
                { text: "संतुष्ट और गर्व", score: 2 },
                { text: "तटस्थ", score: 1 },
                { text: "निराश या अपर्याप्त", score: 0 }
            ]
        }
    },
    {
        en: "Do you have activities or hobbies that bring you joy?",
        hi: "क्या आपकी ऐसी गतिविधियां या शौक हैं जो आपको खुशी देते हैं?",
        options: {
            en: [
                { text: "Yes, and I engage in them regularly", score: 2 },
                { text: "Yes, but I don't do them much", score: 1 },
                { text: "No, I've lost interest", score: 0 }
            ],
            hi: [
                { text: "हां, और मैं उन्हें नियमित रूप से करता हूं", score: 2 },
                { text: "हां, लेकिन मैं उन्हें ज्यादा नहीं करता", score: 1 },
                { text: "नहीं, मैंने रुचि खो दी है", score: 0 }
            ]
        }
    },
    {
        en: "How would you rate your self-esteem right now?",
        hi: "अभी आप अपने आत्मसम्मान को कैसे आंकेंगे?",
        options: {
            en: [
                { text: "Good, I feel confident", score: 2 },
                { text: "Average", score: 1 },
                { text: "Low, I doubt myself often", score: 0 }
            ],
            hi: [
                { text: "अच्छा, मुझे आत्मविश्वास महसूस होता है", score: 2 },
                { text: "औसत", score: 1 },
                { text: "कम, मैं अक्सर खुद पर संदेह करता हूं", score: 0 }
            ]
        }
    },
    {
        en: "Do you find it easy or difficult to make decisions?",
        hi: "क्या आपको निर्णय लेना आसान या मुश्किल लगता है?",
        options: {
            en: [
                { text: "Easy, I can decide without much trouble", score: 2 },
                { text: "Sometimes difficult", score: 1 },
                { text: "Very difficult, I feel stuck", score: 0 }
            ],
            hi: [
                { text: "आसान, मैं बिना ज्यादा परेशानी के निर्णय ले सकता हूं", score: 2 },
                { text: "कभी-कभी मुश्किल", score: 1 },
                { text: "बहुत मुश्किल, मैं फंसा हुआ महसूस करता हूं", score: 0 }
            ]
        }
    }
];

// State management
let selectedQuestions = [];
let currentQuestionIndex = 0;
let totalScore = 0;
const maxScore = 10; // 5 questions × 2 max points

// DOM elements
let chatArea, optionsArea, inputArea, userInput, sendBtn, progressBar, progressText;

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    // Show language selection first
    document.getElementById('languageScreen').style.display = 'flex';
});

function startApp() {
    // Get DOM elements
    chatArea = document.getElementById('chatArea');
    optionsArea = document.getElementById('optionsArea');
    inputArea = document.getElementById('inputArea');
    userInput = document.getElementById('userInput');
    sendBtn = document.getElementById('sendBtn');
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');
    
    // Update input placeholder
    const t = getTranslations();
    userInput.placeholder = t.typePlaceholder;
    sendBtn.textContent = t.send;
    
    // Select 5 random questions
    selectedQuestions = getRandomQuestions(5);
    
    setTimeout(() => {
        displayMessage(t.greeting1, "bot");
        setTimeout(() => {
            displayMessage(t.greeting2, "bot");
            setTimeout(() => {
                startQuestionnaire();
            }, 2000);
        }, 2000);
    }, 500);
}

// Get random questions from the pool
function getRandomQuestions(count) {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ========================================
// QUESTIONNAIRE FLOW
// ========================================

function startQuestionnaire() {
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = selectedQuestions[index];
    const t = getTranslations();
    
    // Update progress
    const progress = ((index + 1) / selectedQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = `${t.questionOf} ${index + 1} ${t.of} ${selectedQuestions.length}`;
    
    // Display question in selected language
    setTimeout(() => {
        const questionText = selectedLanguage === 'en' ? question.en : question.hi;
        displayMessage(questionText, "bot");
        
        // Show options
        setTimeout(() => {
            const options = question.options[selectedLanguage];
            showOptions(options.map(opt => ({
                text: opt.text,
                action: () => handleAnswer(opt)
            })));
        }, 800);
    }, 500);
}

function handleAnswer(selectedOption) {
    initAudioContext();
    
    totalScore += selectedOption.score;
    displayMessage(selectedOption.text, "user");
    clearOptions();
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < selectedQuestions.length) {
        setTimeout(() => {
            showQuestion(currentQuestionIndex);
        }, 1000);
    } else {
        setTimeout(() => {
            analyzeMood();
        }, 1000);
    }
}

// ========================================
// MOOD ANALYSIS WITH SCORE DISPLAY
// ========================================

function analyzeMood() {
    const t = getTranslations();
    progressText.textContent = selectedLanguage === 'en' ? "Assessment complete" : "मूल्यांकन पूर्ण";
    
    displayMessage(t.analyzing, "bot");
    
    setTimeout(() => {
        // Display score
        displayScore();
        
        setTimeout(() => {
            const scorePercentage = (totalScore / maxScore) * 100;
            
            if (scorePercentage >= 70) {
                showPositiveMessage();
            } else if (scorePercentage >= 40) {
                showNeutralMessage();
            } else {
                showLowMoodSupport();
            }
        }, 2000);
    }, 2000);
}

function displayScore() {
    const t = getTranslations();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'score-display';
    scoreDiv.innerHTML = `
        <div class="score-label">${t.scoreLabel}</div>
        <div class="score-number">${totalScore}/${maxScore}</div>
        <div class="score-interpretation">${getScoreInterpretation()}</div>
    `;
    
    contentDiv.appendChild(scoreDiv);
    messageDiv.appendChild(contentDiv);
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    
    playCompletionChime();
}

function getScoreInterpretation() {
    const scorePercentage = (totalScore / maxScore) * 100;
    
    if (selectedLanguage === 'en') {
        if (scorePercentage >= 70) return "Doing Well 😊";
        if (scorePercentage >= 40) return "Managing 😐";
        return "Need Support 😔";
    } else {
        if (scorePercentage >= 70) return "अच्छा कर रहे हैं 😊";
        if (scorePercentage >= 40) return "संभाल रहे हैं 😐";
        return "सहायता चाहिए 😔";
    }
}

function showPositiveMessage() {
    const t = getTranslations();
    displayMessage(t.positive, "bot");
    
    setTimeout(() => {
        displayMessage(t.positiveAdvice, "bot");
        setTimeout(() => {
            showFinalOptions();
        }, 2000);
    }, 2000);
}

function showNeutralMessage() {
    const t = getTranslations();
    displayMessage(t.neutral, "bot");
    
    setTimeout(() => {
        displayMessage(t.neutralQuestion, "bot");
        
        setTimeout(() => {
            showOptions([
                { text: t.yesTry, action: showUpliftMenu },
                { text: t.noThanks, action: showDisclaimer }
            ]);
        }, 1500);
    }, 2000);
}

function showLowMoodSupport() {
    const t = getTranslations();
    displayMessage(t.lowMood, "bot");
    
    setTimeout(() => {
        displayMessage(t.lowMoodQuestion, "bot");
        
        setTimeout(() => {
            showOptions([
                { text: t.yesTry, action: showUpliftMenu },
                { text: t.noThanks, action: showDisclaimer }
            ]);
        }, 1500);
    }, 2000);
}

// ========================================
// MOOD UPLIFT ACTIVITIES MENU
// ========================================

function showUpliftMenu() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.upliftMenu, "bot");
    
    setTimeout(() => {
        showOptions([
            { text: t.breathing, action: breathingExercise },
            { text: t.grounding, action: groundingExercise },
            { text: t.gratitude, action: gratitudePrompt },
            { text: t.reset, action: physicalReset }
        ]);
    }, 800);
}

// ========================================
// ACTIVITY 1: BREATHING EXERCISE
// ========================================

function breathingExercise() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.breathingIntro1, "bot");
    
    setTimeout(() => {
        displayMessage(t.breathingIntro2, "bot");
        
        setTimeout(() => {
            displayMessage(t.breathingIntro3, "bot");
            
            setTimeout(() => {
                startBreathingAnimation();
            }, 1500);
        }, 2000);
    }, 1500);
}

function startBreathingAnimation() {
    const t = getTranslations();
    const circleContainer = document.createElement('div');
    circleContainer.className = 'message activity';
    
    const circleContent = document.createElement('div');
    circleContent.className = 'message-content';
    
    const circleDiv = document.createElement('div');
    circleDiv.className = 'breathing-circle';
    circleDiv.innerHTML = `
        <div class="breath-label">${t.ready}</div>
        <div class="breath-count"></div>
    `;
    
    circleContent.appendChild(circleDiv);
    circleContainer.appendChild(circleContent);
    chatArea.appendChild(circleContainer);
    chatArea.scrollTop = chatArea.scrollHeight;
    
    const label = circleDiv.querySelector('.breath-label');
    const count = circleDiv.querySelector('.breath-count');
    
    let cycleCount = 0;
    const totalCycles = 4;
    
    setTimeout(() => {
        playTimerBeep();
        runBreathCycle();
    }, 1000);
    
    function runBreathCycle() {
        if (cycleCount >= totalCycles) {
            circleDiv.className = 'breathing-circle hold';
            label.textContent = t.complete;
            count.textContent = '✓';
            playCompletionChime();
            
            setTimeout(() => {
                displayMessage(t.breathingComplete, "bot");
                setTimeout(() => {
                    showFollowUp();
                }, 2500);
            }, 1500);
            return;
        }
        
        cycleCount++;
        
        // INHALE
        label.textContent = t.breathIn;
        circleDiv.className = 'breathing-circle inhale';
        
        for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
                count.textContent = i;
                playCountBeep(i);
            }, (i - 1) * 1000);
        }
        
        // HOLD
        setTimeout(() => {
            label.textContent = t.hold;
            count.textContent = '';
            circleDiv.className = 'breathing-circle hold';
        }, 4000);
        
        // EXHALE
        setTimeout(() => {
            label.textContent = t.breathOut;
            circleDiv.className = 'breathing-circle exhale';
            
            for (let i = 1; i <= 6; i++) {
                setTimeout(() => {
                    count.textContent = i;
                    playCountBeep(i);
                }, (i - 1) * 1000);
            }
        }, 4500);
        
        setTimeout(() => {
            runBreathCycle();
        }, 11000);
    }
}

// ========================================
// ACTIVITY 2: GROUNDING EXERCISE
// ========================================

function groundingExercise() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.groundingIntro, "bot");
    
    const prompts = t.groundingPrompts;
    let promptIndex = 0;
    
    function askNextPrompt() {
        if (promptIndex < prompts.length) {
            setTimeout(() => {
                displayMessage(prompts[promptIndex], "bot");
                playSoftBeep(440, 0.2);
                promptIndex++;
                
                setTimeout(() => {
                    enableUserInput(() => {
                        const userResponse = userInput.value.trim();
                        if (userResponse) {
                            displayMessage(userResponse, "user");
                            userInput.value = '';
                            playSoftBeep(520, 0.15);
                            
                            if (promptIndex < prompts.length) {
                                askNextPrompt();
                            } else {
                                disableUserInput();
                                setTimeout(() => {
                                    displayMessage(t.groundingComplete, "bot");
                                    playCompletionChime();
                                    setTimeout(() => {
                                        showFollowUp();
                                    }, 2000);
                                }, 1000);
                            }
                        }
                    });
                }, 800);
            }, 1000);
        }
    }
    
    askNextPrompt();
}

// ========================================
// ACTIVITY 3: GRATITUDE PROMPT
// ========================================

function gratitudePrompt() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.gratitudeIntro, "bot");
    
    setTimeout(() => {
        displayMessage(t.gratitudePrompt, "bot");
        playSoftBeep(440, 0.2);
        
        setTimeout(() => {
            enableUserInput(() => {
                const userResponse = userInput.value.trim();
                if (userResponse) {
                    displayMessage(userResponse, "user");
                    userInput.value = '';
                    disableUserInput();
                    playCompletionChime();
                    
                    setTimeout(() => {
                        displayMessage(t.gratitudeResponse, "bot");
                        setTimeout(() => {
                            showFollowUp();
                        }, 2000);
                    }, 1000);
                }
            });
        }, 1500);
    }, 1500);
}

// ========================================
// ACTIVITY 4: PHYSICAL RESET
// ========================================

function physicalReset() {
    clearOptions();
    const t = getTranslations();
    
    displayStepByStep(t.resetSteps, 3000, () => {
        playCompletionChime();
        setTimeout(() => {
            showFollowUp();
        }, 1000);
    }, true);
}

// ========================================
// FOLLOW-UP AFTER ACTIVITY
// ========================================

function showFollowUp() {
    const t = getTranslations();
    displayMessage(t.followUp, "bot");
    
    setTimeout(() => {
        showOptions([
            { 
                text: t.better, 
                action: () => {
                    clearOptions();
                    displayMessage(t.better, "user");
                    playCompletionChime();
                    setTimeout(() => {
                        displayMessage(t.betterResponse, "bot");
                        setTimeout(() => {
                            showDisclaimer();
                        }, 1500);
                    }, 800);
                }
            },
            { 
                text: t.same, 
                action: () => {
                    clearOptions();
                    displayMessage(t.same, "user");
                    setTimeout(() => {
                        displayMessage(t.sameResponse, "bot");
                        setTimeout(() => {
                            showOptions([
                                { text: t.showOther, action: showUpliftMenu },
                                { text: t.done, action: showDisclaimer }
                            ]);
                        }, 1500);
                    }, 800);
                }
            },
            { 
                text: t.notHelping, 
                action: () => {
                    clearOptions();
                    displayMessage(t.notHelping, "user");
                    setTimeout(() => {
                        displayMessage(t.notHelpingResponse, "bot");
                        setTimeout(() => {
                            showDisclaimer();
                        }, 1500);
                    }, 800);
                }
            }
        ]);
    }, 1000);
}

// ========================================
// DISCLAIMER & RESOURCES
// ========================================

function showDisclaimer() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.disclaimer, "disclaimer");
    
    setTimeout(() => {
        showOptions([
            { text: t.gotIt, action: showFinalOptions },
            { text: t.showResources, action: offerResources }
        ]);
    }, 2000);
}

function offerResources() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.resources, "bot");
    
    setTimeout(() => {
        let resourcesHtml;
        
        if (selectedLanguage === 'en') {
            resourcesHtml = `
                <div class="resource-list">
                    <div class="resource-item">
                        <strong>Crisis Text Line</strong>
                        <div class="link">Text HOME to 741741</div>
                        <div class="description">24/7 support via text</div>
                    </div>
                    <div class="resource-item">
                        <strong>NAMI Helpline</strong>
                        <div class="link">1-800-950-NAMI (6264)</div>
                        <div class="description">Mental health information and support</div>
                    </div>
                    <div class="resource-item">
                        <strong>988 Suicide & Crisis Lifeline</strong>
                        <div class="link">Call or text 988</div>
                        <div class="description">24/7 crisis support</div>
                    </div>
                </div>
            `;
        } else {
            resourcesHtml = `
                <div class="resource-list">
                    <div class="resource-item">
                        <strong>वंदित्वा हेल्पलाइन</strong>
                        <div class="link">1800-233-3330</div>
                        <div class="description">मानसिक स्वास्थ्य सहायता</div>
                    </div>
                    <div class="resource-item">
                        <strong>iCall हेल्पलाइन</strong>
                        <div class="link">9152987821</div>
                        <div class="description">भावनात्मक समर्थन परामर्श</div>
                    </div>
                    <div class="resource-item">
                        <strong>NIMHANS हेल्पलाइन</strong>
                        <div class="link">080-46110007</div>
                        <div class="description">24/7 मानसिक स्वास्थ्य सेवा</div>
                    </div>
                </div>
            `;
        }
        
        displayMessage(resourcesHtml, "bot", true);
        
        setTimeout(() => {
            showFinalOptions();
        }, 2000);
    }, 1000);
}

function showFinalOptions() {
    clearOptions();
    const t = getTranslations();
    
    displayMessage(t.finalQuestion, "bot");
    
    setTimeout(() => {
        showOptions([
            { 
                text: t.restart, 
                action: () => {
                    location.reload();
                }
            },
            { 
                text: t.goodbye, 
                action: () => {
                    clearOptions();
                    displayMessage(t.goodbye, "user");
                    playCompletionChime();
                    setTimeout(() => {
                        displayMessage(t.goodbyeMessage, "bot");
                    }, 800);
                }
            }
        ]);
    }, 1000);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function displayMessage(text, type = "bot", isHtml = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isHtml) {
        contentDiv.innerHTML = text;
    } else {
        contentDiv.textContent = text;
    }
    
    messageDiv.appendChild(contentDiv);
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function showOptions(optionsArray) {
    clearOptions();
    
    optionsArray.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = option.action;
        optionsArea.appendChild(btn);
    });
}

function clearOptions() {
    optionsArea.innerHTML = '';
}

function enableUserInput(callback) {
    inputArea.style.display = 'flex';
    userInput.focus();
    
    sendBtn.onclick = callback;
    userInput.onkeypress = (e) => {
        if (e.key === 'Enter') {
            callback();
        }
    };
}

function disableUserInput() {
    inputArea.style.display = 'none';
    userInput.value = '';
}

function displayStepByStep(steps, delay, callback, withBeeps = false) {
    let index = 0;
    
    function showNext() {
        if (index < steps.length) {
            displayMessage(steps[index], "activity");
            if (withBeeps) {
                playSoftBeep(480, 0.15);
            }
            index++;
            setTimeout(showNext, delay);
        } else {
            if (callback) callback();
        }
    }
    
    showNext();
}

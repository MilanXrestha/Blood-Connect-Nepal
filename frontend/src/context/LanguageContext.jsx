import { createContext, useState, useContext } from 'react';

const translations = {
    en: {
        nav: {
            title: "Blood Connect Nepal",
            findDonors: "Find Donors",
            urgentRequests: "Urgent Requests",
            profile: "Profile",
            logout: "Logout",
            login: "Login",
            register: "Register"
        },
        home: {
            hero: {
                line1: "Donate Blood,",
                line2: "Save Lives in Nepal",
                desc: "Connect directly with blood donors in your district or register yourself to become a lifesaver. Because every drop counts in an emergency.",
                viewRequests: "View Urgent Requests",
                findDonor: "Find a Donor"
            },
            stats: {
                donors: "Registered Donors",
                lives: "Lives Impacted",
                districts: "Districts Covered"
            },
            features: {
                subTitle: "Why Use Blood Connect",
                title: "A better way to find blood",
                districtTitle: "District Wise Search",
                districtDesc: "Quickly locate donors within your specific district or city across Nepal, making the process faster when time is critical.",
                contactTitle: "Direct Contact",
                contactDesc: "Access direct phone numbers of available donors to eliminate middlemen and save precious time in emergencies."
            },
            process: {
                subTitle: "Simple Process",
                title: "How it works",
                step1Title: "Register",
                step1Desc: "Sign up and provide your blood group and location details.",
                step2Title: "Find or Request",
                step2Desc: "Search for donors in your area or post an urgent blood request.",
                step3Title: "Connect",
                step3Desc: "Get in touch directly and save a life when it matters most."
            },
            bloodInfo: {
                title: "Understanding Blood Donation",
                subTitle: "Learn More",
                tabs: {
                    guidelines: "Donation Guidelines",
                    compatibility: "Blood Compatibility",
                    benefits: "Health Benefits"
                },
                content: {
                    guidelines: [
                        "Must be in good health and feeling well.",
                        "Must be at least 18 years old.",
                        "Weight must be at least 45 kg (110 lbs).",
                        "Cannot donate if you have had a tattoo or piercing in the last 6 months."
                    ],
                    compatibility: "O- is the universal donor and can give blood to anyone. AB+ is the universal recipient. Always ensure proper matching before transfusion.",
                    benefits: [
                        "Stimulates blood cell production.",
                        "Helps maintain healthy iron levels.",
                        "Provides a free health screening.",
                        "Saves up to 3 lives per donation."
                    ]
                }
            },
            community: {
                title: "Building a community of lifesavers.",
                desc: "Blood Connect Nepal is more than just a platform; it's a growing community of everyday heroes. By registering, you ensure that no one in your district has to wait endlessly for a blood match during critical times.",
                joinBtn: "Join the Community",
                seeDonorsBtn: "See our Donors"
            },
            footer: {
                rights: "Blood Connect Nepal. All rights reserved."
            }
        },
        auth: {
                loginTitle: "Sign in to your account",
                username: "Username",
                password: "Password",
                signIn: "Sign in",
                signingIn: "Signing in...",
                noAccount: "Don't have an account?",
                registerAsDonor: "Register as a donor",
                registerTitle: "Become a Donor",
                email: "Email Address",
                phone: "Phone Number",
                bloodGroup: "Blood Group",
                district: "District",
                select: "Select...",
                registerBtn: "Register as Donor",
                registering: "Registering...",
                alreadyRegistered: "Already registered?",
                signInHere: "Sign in here",
                invalidLogin: "Invalid username or password. Please try again.",
                regFailed: "Registration failed. Please try again."
            },
            donors: {
                title: "Find Blood Donors",
                subtitle: "Search and contact available donors directly.",
                searchPlaceholder: "Search by name...",
                anyBloodGroup: "Any Blood Group",
                anyDistrict: "Any District",
                noDonors: "No donors found",
                noDonorsDesc: "Try adjusting your search or filters to find more donors.",
                availableNow: "Available Now",
                unavailable: "Unavailable",
                contactDonor: "Contact Donor",
                notSpecified: "Not specified"
            },
            requests: {
                title: "Urgent Blood Requests",
                subtitle: "Help save a life by responding to these urgent appeals.",
                cancelRequest: "Cancel Request",
                postRequest: "Post Request",
                loginToPost: "Log in to post a blood request",
                postNewRequest: "Post a New Request",
                patientName: "Patient Name",
                hospitalName: "Hospital Name",
                bloodGroupNeeded: "Blood Group Needed",
                contactPhone: "Contact Phone Number",
                urgencyLevel: "Urgency Level",
                submitRequest: "Submit Request",
                posting: "Posting...",
                noRequests: "No active requests",
                noRequestsDesc: "There are currently no urgent blood requests.",
                urgency: "Urgency",
                fulfilled: "Fulfilled",
                posted: "Posted",
                bloodNeededUrgently: "Blood needed urgently",
                contactFamily: "Contact Family"
            },
            profile: {
                title: "Donor Profile",
                subtitle: "Manage your availability and information.",
                status: "Status",
                available: "Available to Donate",
                unavailableStatus: "Currently Unavailable",
                changeTo: "Change to",
                updating: "Updating...",
                myRequests: "My Requests",
                markFulfilled: "Mark Fulfilled",
                noRequests: "You haven't posted any blood requests yet.",
                notProvided: "Not provided"
            }
    },
    ne: {
        nav: {
            title: "रक्तदान नेपाल",
            findDonors: "रक्तदाता खोज्नुहोस्",
            urgentRequests: "अत्यावश्यक अनुरोधहरू",
            profile: "प्रोफाइल",
            logout: "लगआउट",
            login: "लगइन",
            register: "दर्ता गर्नुहोस्"
        },
        home: {
            hero: {
                line1: "रक्तदान गर्नुहोस्,",
                line2: "नेपालमा जीवन बचाउनुहोस्",
                desc: "तपाईंको जिल्लाका रक्तदाताहरूसँग सिधै सम्पर्क गर्नुहोस् वा जीवन बचाउने व्यक्ति बन्न आफैलाई दर्ता गर्नुहोस्। किनकि आपतकालमा हरेक थोपा महत्त्वपूर्ण हुन्छ।",
                viewRequests: "अत्यावश्यक अनुरोधहरू हेर्नुहोस्",
                findDonor: "रक्तदाता खोज्नुहोस्"
            },
            stats: {
                donors: "दर्ता भएका रक्तदाताहरू",
                lives: "प्रभावित जीवनहरू",
                districts: "समेटिएका जिल्लाहरू"
            },
            features: {
                subTitle: "किन ब्लड कनेक्ट प्रयोग गर्ने",
                title: "रगत खोज्ने राम्रो तरिका",
                districtTitle: "जिल्ला अनुसार खोजी",
                districtDesc: "नेपालभर तपाईंको विशिष्ट जिल्ला वा सहर भित्र रक्तदाताहरू छिटो फेला पार्नुहोस्, समय महत्त्वपूर्ण हुँदा प्रक्रियालाई छिटो बनाउँदै।",
                contactTitle: "प्रत्यक्ष सम्पर्क",
                contactDesc: "बिचौलियाहरू हटाउन र आपतकालीन अवस्थाहरूमा बहुमूल्य समय बचाउन उपलब्ध रक्तदाताहरूको प्रत्यक्ष फोन नम्बरहरू प्राप्त गर्नुहोस्।"
            },
            process: {
                subTitle: "सरल प्रक्रिया",
                title: "यसले कसरी काम गर्छ",
                step1Title: "दर्ता गर्नुहोस्",
                step1Desc: "साइन अप गर्नुहोस् र तपाईंको रक्त समूह र स्थान विवरणहरू प्रदान गर्नुहोस्।",
                step2Title: "खोज्नुहोस् वा अनुरोध गर्नुहोस्",
                step2Desc: "तपाईंको क्षेत्रमा रक्तदाताहरू खोज्नुहोस् वा अत्यावश्यक रगत अनुरोध पोस्ट गर्नुहोस्।",
                step3Title: "सम्पर्क गर्नुहोस्",
                step3Desc: "सिधै सम्पर्क गर्नुहोस् र महत्त्वपूर्ण समयमा जीवन बचाउनुहोस्।"
            },
            bloodInfo: {
                title: "रक्तदानको बारेमा बुझौं",
                subTitle: "थप जान्नुहोस्",
                tabs: {
                    guidelines: "रक्तदान मापदण्ड",
                    compatibility: "रक्त समूह अनुकूलता",
                    benefits: "स्वास्थ्य लाभ"
                },
                content: {
                    guidelines: [
                        "राम्रो स्वास्थ्यमा हुनुपर्छ र सन्चो महसुस गरेको हुनुपर्छ।",
                        "कम्तिमा १८ वर्ष पूरा भएको हुनुपर्छ।",
                        "तौल कम्तिमा ४५ किलो (११० पाउन्ड) हुनुपर्छ।",
                        "पछिल्लो ६ महिनामा ट्याटु वा छेड्ने काम गरेको भए रक्तदान गर्न मिल्दैन।"
                    ],
                    compatibility: "O- युनिभर्सल डोनर हो र जो कोहीलाई रगत दिन सक्छ। AB+ युनिभर्सल प्राप्तकर्ता हो। ट्रान्सफ्युजन अघि सधैं उचित मिलान सुनिश्चित गर्नुहोस्।",
                    benefits: [
                        "रक्त कोषिका उत्पादनलाई उत्तेजित गर्छ।",
                        "स्वस्थ आइरन स्तर कायम राख्न मद्दत गर्छ।",
                        "नि:शुल्क स्वास्थ्य जाँच प्रदान गर्छ।",
                        "प्रति दान ३ जना सम्मको ज्यान बचाउँछ।"
                    ]
                }
            },
            community: {
                title: "जीवन बचाउनेहरूको समुदाय निर्माण गर्दै।",
                desc: "ब्लड कनेक्ट नेपाल एउटा प्लेटफर्म मात्र होइन; यो दैनिक नायकहरूको बढ्दो समुदाय हो। दर्ता गरेर, तपाईंले सुनिश्चित गर्नुहुन्छ कि तपाईंको जिल्लामा कसैले पनि आपतकालिन समयमा रगत मिल्नका लागि अनन्त पर्खाइमा बस्नुपर्दैन।",
                joinBtn: "समुदायमा सामेल हुनुहोस्",
                seeDonorsBtn: "हाम्रा रक्तदाताहरू हेर्नुहोस्"
            },
            footer: {
                rights: "रक्तदान नेपाल। सबै अधिकार सुरक्षित।"
            }
        },
        auth: {
                loginTitle: "तपाईंको खातामा साइन इन गर्नुहोस्",
                username: "प्रयोगकर्ता नाम",
                password: "पासवर्ड",
                signIn: "साइन इन गर्नुहोस्",
                signingIn: "साइन इन हुँदैछ...",
                noAccount: "खाता छैन?",
                registerAsDonor: "रक्तदाताको रूपमा दर्ता गर्नुहोस्",
                registerTitle: "रक्तदाता बन्नुहोस्",
                email: "इमेल ठेगाना",
                phone: "फोन नम्बर",
                bloodGroup: "रक्त समूह",
                district: "जिल्ला",
                select: "छान्नुहोस्...",
                registerBtn: "रक्तदाताको रूपमा दर्ता गर्नुहोस्",
                registering: "दर्ता हुँदैछ...",
                alreadyRegistered: "पहिले नै दर्ता हुनुहुन्छ?",
                signInHere: "यहाँ साइन इन गर्नुहोस्",
                invalidLogin: "अवैध प्रयोगकर्ता नाम वा पासवर्ड। कृपया फेरि प्रयास गर्नुहोस्।",
                regFailed: "दर्ता असफल भयो। कृपया फेरि प्रयास गर्नुहोस्।"
            },
            donors: {
                title: "रक्तदाता खोज्नुहोस्",
                subtitle: "उपलब्ध रक्तदाताहरू खोज्नुहोस् र सिधै सम्पर्क गर्नुहोस्।",
                searchPlaceholder: "नाम द्वारा खोज्नुहोस्...",
                anyBloodGroup: "कुनै पनि रक्त समूह",
                anyDistrict: "कुनै पनि जिल्ला",
                noDonors: "कुनै रक्तदाता भेटिएन",
                noDonorsDesc: "थप रक्तदाताहरू फेला पार्न आफ्नो खोज वा फिल्टरहरू समायोजन गर्ने प्रयास गर्नुहोस्।",
                availableNow: "अहिले उपलब्ध",
                unavailable: "अनुपलब्ध",
                contactDonor: "रक्तदातालाई सम्पर्क गर्नुहोस्",
                notSpecified: "उल्लेख गरिएको छैन"
            },
            requests: {
                title: "अत्यावश्यक रगत अनुरोधहरू",
                subtitle: "यी अत्यावश्यक अपीलहरूलाई प्रतिक्रिया दिएर जीवन बचाउन मद्दत गर्नुहोस्।",
                cancelRequest: "अनुरोध रद्द गर्नुहोस्",
                postRequest: "अनुरोध पोस्ट गर्नुहोस्",
                loginToPost: "रगत अनुरोध पोस्ट गर्न लगइन गर्नुहोस्",
                postNewRequest: "नयाँ अनुरोध पोस्ट गर्नुहोस्",
                patientName: "बिरामीको नाम",
                hospitalName: "अस्पतालको नाम",
                bloodGroupNeeded: "आवश्यक रक्त समूह",
                contactPhone: "सम्पर्क फोन नम्बर",
                urgencyLevel: "जरुरी स्तर",
                submitRequest: "अनुरोध पेश गर्नुहोस्",
                posting: "पोस्ट हुँदैछ...",
                noRequests: "कुनै सक्रिय अनुरोधहरू छैनन्",
                noRequestsDesc: "हाल कुनै अत्यावश्यक रगत अनुरोधहरू छैनन्।",
                urgency: "जरुरी",
                fulfilled: "पूरा भयो",
                posted: "पोस्ट गरिएको",
                bloodNeededUrgently: "तुरुन्त रगत आवश्यक छ",
                contactFamily: "परिवारलाई सम्पर्क गर्नुहोस्"
            },
            profile: {
                title: "रक्तदाता प्रोफाइल",
                subtitle: "आफ्नो उपलब्धता र जानकारी प्रबन्ध गर्नुहोस्।",
                status: "स्थिति",
                available: "रक्तदान गर्न उपलब्ध",
                unavailableStatus: "हाल अनुपलब्ध",
                changeTo: "परिवर्तन गर्नुहोस्",
                updating: "अपडेट हुँदैछ...",
                myRequests: "मेरा अनुरोधहरू",
                markFulfilled: "पूरा भएको चिनो लगाउनुहोस्",
                noRequests: "तपाईंले अहिलेसम्म कुनै रगत अनुरोध पोस्ट गर्नुभएको छैन।",
                notProvided: "प्रदान गरिएको छैन"
            }
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'ne' : 'en'));
    };

    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

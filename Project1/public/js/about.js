var a = 0;
var txt1 = 'Dr. Parag Patil is a dedicated and skilled Ayurvedic practitioner with over 10 years of experience in holistic and traditional Indian medicine. Having earned his Bachelor of Ayurvedic Medicine and Surgery(BAMS) degree from the renowned Ayurved University, Dr. Patil has mastered the ancient art and science of Ayurveda, specializing in the integration of herbal medicine, dietetics, and lifestyle modifications to promote wellness and balance.';
var speed = 5;
function typeWriter1() {
    if (a < txt1.length) {
        document.getElementById("main3").innerHTML += txt1.charAt(a);
        a++;
        setTimeout(typeWriter1, speed);
    }
}
typeWriter1();
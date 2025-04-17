const loading = document.querySelector(".loading");

window.addEventListener(
  "load",
  () => {
    setTimeout(() => {
      loading.classList.add("hide");
      console.log(1);
    }, 3000);
  },
  false
);

$(function () {
  const CLASSNAME = "visible";
  const TIMEOUT = 1500;
  // const target = $(".loading__text");
  setInterval(() => {
    $(".loading__text").addClass(CLASSNAME);
    console.log(1);
  }, TIMEOUT);
});

const mySwiper = new Swiper(".swiper", {
  loop: true, //無限ループ
  speed: 1000, //スライドの速度
  shortSwipes: false,
  longSwipes: false,
  longSwipesRatio: 0,
  followFinger: false,
  autoplay: {
    delay: 3000,
    waitForTranssition: false,
  },
});

//ハンバーガー
const items = document.querySelectorAll(".l_header-nav_item");
const body = document.querySelector("#js-body");
const ham = document.querySelector("#js-hamburger"); //js-hamburgerの要素を取得し、変数hamに格納
const nav = document.querySelector("#js-nav"); //js-navの要素を取得し、変数navに格納

ham.addEventListener("click", function () {
  //ハンバーガーメニューをクリックしたら
  body.classList.toggle("active");
  ham.classList.toggle("active"); // ハンバーガーメニューにactiveクラスを付け外し
  nav.classList.toggle("active"); // ナビゲーションメニューにactiveクラスを付け外し
});

items.forEach(function (item) {
  item.addEventListener("click", function () {
    body.classList.remove("active");
    ham.classList.remove("active");
    nav.classList.remove("active");
  });
});

// アコーディオン

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const closingAnim = content.animate(
          closingAnimKeyframes(content),
          animTiming
        );
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const openingAnim = content.animate(
          openingAnimKeyframes(content),
          animTiming
        );
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
};

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
  duration: 400,
  easing: "ease-out",
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + "px", // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];

$(document).ready(function () {
  // Default language
  let currentLang = "th";

  // Language data
  const translations = {
    th: {
      // Add Thai translations here
      navAbout: "KX SMART Play คืออะไร",
      navCourse: "แนะนำหลักสูตร",
      navAboutus: "เกี่ยวกับเรา",
      navTestimonials: "รีวิวจากผู้ปกครองและนักเรียน",
      navContact: "ติดต่อเรา",
      quote:
        "ค้นหาตัวเอง ความชอบ ความถนัด พร้อมพัฒนาทักษะสำคัญที่ KX SMART Play",
      top_about_title: "KX SMART Play คืออะไร!?",
      info_para1:
        "KX SMART Play เป็นพื้นที่ที่ออกแบบมาเพื่อเสริมสร้างทักษะแห่งศตวรรษที่ 21 และการค้นพบตนเองของนักนวัตกรรมรุ่นเยาว์ พัฒนาโดย มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ.)",
      info_para2:
        'เราเน้นการเรียนรู้ผ่าน "การเรียนรู้โดยใช้การเล่นเป็นฐาน" และ "การเรียนรู้โดยใช้โครงงานเป็นฐาน" ซึ่งมั่นใจได้ว่าเป็นประสบการณ์การศึกษาแบบองค์รวมที่สอดคล้องกับ การศึกษาแบบ STEAM:',
      info_sub1: "🧑‍🔬 วิทยาศาสตร์ (Science)",
      info_sub2: "🧑‍💻 เทคโนโลยี (Technology)",
      info_sub3: "⚙️ วิศวกรรมศาสตร์ (Engineering)",
      info_sub4: "🎨 ศิลปะ (Arts)",
      info_sub5: "➕ คณิตศาสตร์ (Mathematics)",
      info_para3:
        "โปรแกรมของเราผสมผสานความรู้ที่ครอบคลุมและการพัฒนาทักษะที่จำเป็น เพื่อเสริมพลังให้เด็กๆ ได้เรียนรู้อย่างมีประสิทธิภาพ",
      info_para4: "🌟 สภาพแวดล้อมการเรียนรู้ที่ KX SMART Play 🌟",
      topic_skill: "ทักษะแห่งศตวรรษที่ 21",
      skill1: "ความคิดสร้างสรรค์และการสร้างนวัตกรรม",
      skill2: "การคิดวิเคราะห์และการแก้ปัญหา",
      skill3: "การสื่อสารอย่างมีประสิทธิภาพ",
      skill4: "การทำงานร่วมกับผู้อื่น",
      skill5: "ทักษะการใช้เทคโนโลยีอย่างมีประสิทธิภาพ",
      video_text: "บรรยากาศที่ KX SMART Play",
      topic_strength: "จุดเด่นของ KX SMART Play",
      title_strength1:
        "✅ หลักสูตรที่ออกแบบโดยผู้เชี่ยวชาญ ปรับแต่งเพื่อการเรียนรู้ที่มีประสิทธิภาพ",
      title_strength2:
        "✅ อุปกรณ์การเรียนรู้คุณภาพสูง เช่น LEGO อุปกรณ์อิเล็กทรอนิกส์ และเทคโนโลยีทันสมัย",
      title_strength3:
        "✅ ตั้งอยู่ที่ศูนย์การค้าเอ็มควอเทียร์ เพื่อความสะดวกในการเข้าถึง",
      steam_topic: "การศึกษาแบบ STEAM",
      steam_info1: "STEAM คือแนวคิดการศึกษาที่รวมอักษรแรกของ",
      steam_info2: "Science (วิทยาศาสตร์)",
      steam_info3: "Technology (เทคโนโลยี)",
      steam_info4: "Engineering (วิศวกรรม/การสร้าง)",
      steam_info5: "Art (ศิลปะ/ศิลปศาสตร์)",
      steam_info6: "Mathematics (คณิตศาสตร์)",
      steam_info7: "เข้าด้วยกัน",
      steam_info8:
        "เกิดขึ้นท่ามกลางนวัตกรรมทางเทคโนโลยีและการเปลี่ยนแปลงครั้งใหญ่จากอิทธิพลของปัญญาประดิษฐ์โดยมีเป้าหมายในการพัฒนาเด็กๆ ให้เป็นบุคลากรที่มีความสามารถในการแข่งขันที่ปรับตัวเข้ากับสังคม IT ในอนาคตผ่านการเรียนรู้ในทั้ง 5 สาขานี้",
      topic_course: "เนื้อหาหลักสูตร",
      title_target: "อายุเป้าหมาย",
      title_quantity: "จำนวนครั้ง",
      title_object: "วัตถุประสงค์",
      title_getskill: "ทักษะที่จะได้รับ",
      course_name1: "หลักสูตร LEGO for Creative Foundaion",
      course_name2: "หลักสูตร LEGO for Creative Problem Solving ",
      course_name3: "หลักสูตร LEGO for Complex Problem Solving",
      course_name4:
        "หลักสูตร LEGO for Coding Skill (Icon Block) Via LEGO Spike Prime",
      course_name5:
        "หลักสูตร LEGO for Coding Skill (Word Block) Via LEGO Spike Prime",
      course_name6: "หลักสูตร Basic Electronic",
      target_age1: "4-6 ปี",
      quantity1: "4 ครั้ง (ประมาณ 1.5 ชั่วโมง x 4 ครั้ง)",
      object1:
        "ฝึกกล้ามเนื้อมัดเล็ก สมาธิ ความคิดสร้างสรรค์ การคิด แก้ปัญหา การสื่อสาร และเตรียมความพร้อมสำหรับ LEGO for Creative Problem Solving",
      get_skill1: "Creativity, Communication, Concentration",
      target_age2: "4-9 ปี",
      quantity2: "9 ครั้ง (ประมาณ 1.5 ชั่วโมง x 9 ครั้ง)",
      object2:
        "พัฒนาทักษะการสังเกต ความคิดสร้างสรรค์ และการแก้ปัญหาอย่างเป็นระบบ พร้อมฝึกกล้ามเนื้อมัดเล็ก สมาธิ และสร้างความมั่นใจในตนเองผ่านการสร้างผลงานจาก LEGO",
      get_skill2: "Communication, Problem Solving, Creativity",
      target_age3: "8-15 ปี",
      quantity3: "5 ครั้ง (ประมาณ 1.5 ชั่วโมง x 5 ครั้ง)",
      object3:
        "พัฒนาทักษะการสังเกต ความคิดสร้างสรรค์ และการแก้ปัญหาอย่างเป็นระบบ ทักษะในการทำงานที่เกี่ยวข้องกับสาขาวิชา Mechatronics เพื่อออกแบบและสร้างระบบหรือเครื่องจักรที่มีความซับซ้อน",
      get_skill3: "Communication, Problem Solving",
      target_age4: "6-15 ปี",
      quantity4: "5 ครั้ง (ประมาณ 1.5 ชั่วโมง x 5 ครั้ง)",
      object4:
        "ช่วยพัฒนาและเสริมสร้างทักษะให้กับผู้เรียน โดยเฉพาะในด้านกล้ามเนื้อมัดเล็ก, สมาธิ, ความคิดสร้างสรรค์, การคิดแก้ปัญหา, การสื่อสาร และการเตรียมความพร้อมสำหรับการเรียนรู้เกี่ยวกับการเขียนโปรแกรมพื้นฐาน (Word Block) ผ่าน LEGO Spike Prim",
      get_skill4: "Communication, Problem Solving, Systematic thinking",
      target_age5: "อายุ 8-15 ปี",
      quantity5: "10 ครั้ง (ประมาณ 1 ชั่วโมงครึ่ง x 10 ครั้ง)",
      object5:
        "การพัฒนาการเขียนทักษะการเขียนโปรแกรมเบื้องต้น การคิดเชิงตรรกะ การแก้ปัญหา การสร้างสรรค์ การทำงานเป็นทีม และเตรียมความพร้อมในการใช้เทคโนโลยีหุ่นยนต์ผ่านการลากบล็อคคำสั่ง",
      get_skill5: "Communication, Problem Solving, Systematic thinking",
      target_age6: "อายุ 7-15 ปี",
      quantity6: "10 ครั้ง (ประมาณ 1 ชั่วโมงครึ่ง x 10 ครั้ง)",
      object6:
        "ฝึกทักษะพื้นฐานด้านวิทยาศาสตร์และเทคโนโลยี เรียนรู้การทำงานของไฟฟ้าและวงจรไฟฟ้าในรูปแบบที่เข้าใจง่าย เสริมทักษะการคิดเชิงตรรกะและการแก้ปัญหาผ่านการทดลองและการสร้างสิ่งต่างๆ ด้วยตัวเอง กระตุ้นความคิดสร้างสรรค์ และผู้เรี่ยนสามารถใช้เครื่องมือและอุปกรณ์ทางอิเล็กทรอนิกส์อย่างปลอดภัยอีกด้วย	",
      get_skill6: "Communication, Problem Solving, Systematic thinking",
      head_aboutus: "เกี่ยวกับเรา",
      topic_aboutus: "ภารกิจของ KX SMART Play",
      title_mission: "Mission",
      title_vision: "Vision",
      title_value: "Value Proposition",
      title_key: "KEY MESSAGE",
      info_mission:
        "สร้างนวัตกรรมเยาวชนที่มีความสมดุลทางด้านสติปัญญาและการใช้ชีวิตในสังคม (Young Compassionate Innovator) (เก่งและดี)",
      info_vision:
        "เสริมสร้างและพัฒนาทักษะสำคัญในศตวรรษที่ 21 ด้วยกระบวนการเรียนรู้แบบ STEAM Education ผ่านการเล่น (Play-based learning) และการลงมือทำ (Project-based learning) เพื่อบ่มเพาะเด็กในการค้นหาตัวเอง ความชอบ และความถนัด",
      info_value:
        "Compassionate Innovation Mindset สังคมแห่งการแลกเปลี่ยน เรียนรู้ และลงมือทำ",
      info_key1:
        "ค้นหาตัวเอง ความชอบ ความถนัดพร้อมพัฒนาทักษะสำคัญที่ KX SMART Play",
      info_key2:
        "EXPLORE YOURSELF, YOUR INTEREST, YOUR ABILITY AND ENHANCE ESSENTIAL SOFT SKILL COMPETENCIES AT KX SMART Play!",
      topic_history: "ทีมงานและผู้สอน",
      title_history: "ประวัติและประสบการณ์ของผู้ก่อตั้ง",
      info_history1:
        "KX SMART Play ก่อตั้งโดยทีมผู้เชี่ยวชาญจากมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ.) ที่มีความมุ่งมั่นในการพัฒนาเยาวชนให้มีทักษะที่จำเป็นสำหรับอนาคต",
      info_history2:
        "ด้วยประสบการณ์การสอนและการวิจัยด้านวิทยาศาสตร์และเทคโนโลยี ทีมผู้ก่อตั้งได้พัฒนาหลักสูตรที่ผสมผสานการเรียนรู้ผ่านการเล่นและการลงมือปฏิบัติ เพื่อให้เด็กๆ ได้ค้นพบความชอบและความถนัดของตนเอง",
      title_member: "รายชื่อผู้สอนและความเชี่ยวชาญ",
      member_name1: "อาจารย์ [ชื่อ-นามสกุล]",
      member_expertise1: "ความเชี่ยวชาญ: LEGO Education, Coding",
      member_name2: "อาจารย์ [ชื่อ-นามสกุล]",
      member_expertise2: "ความเชี่ยวชาญ: LEGO Education, Coding",
      member_name3: "อาจารย์ [ชื่อ-นามสกุล]",
      member_expertise3: "ความเชี่ยวชาญ: LEGO Education, Coding",
      reviews: "รีวิวจากผู้ปกครองและนักเรียน",
      more_details: "สอบถามรายละเอียดเพิ่มเติม",
      // Add more translations as needed
    },
    en: {
      // Add English translations here
      navAbout: "What is KX SMART Play",
      navCourse: "Courses",
      navAboutus: "About Us",
      navTestimonials: "Reviews",
      navContact: "Contact Us",
      quote:
        "Find yourself, your interests and your skills, and develop important skills at KX SMART Play.",
      top_about_title: "What is KX SMART Play!?",
      info_para1:
        "KX SMART Play is a space designed to enhance the 21st-century skills and self-discovery of young innovators, developed by King Mongkut's University of Technology Thonburi (KMUTT).",
      info_para2:
        'We emphasize learning through "Play-based Learning" and "Project-based Learning," ensuring a holistic educational experience aligned with STEAM Education:',
      info_sub1: "🧑‍🔬 Science",
      info_sub2: "🧑‍💻 Technology",
      info_sub3: "⚙️ Engineering",
      info_sub4: "🎨 Arts",
      info_sub5: "➕ Mathematics",
      info_para3:
        "Our programs integrate comprehensive knowledge and essential skill development, empowering children to learn effectively.",
      info_para4: "🌟 Learning Environment at KX SMART Play 🌟",
      info_list1: "✅ Expert-designed courses tailored for effective learning",
      info_list2:
        "✅ High-quality learning materials such as LEGO, electronics, and modern technology",
      info_list3: "✅ Conveniently located at EmQuartier Mall for easy access",
      topic_skill: "21st Century Skills",
      skill1: "Creativity and Innovation",
      skill2: "Critical Thinking and Problem Solving",
      skill3: "Communication",
      skill4: "Cooperation",
      skill5: "Technology use and development",
      video_text: "Ambiance at SMART Play",
      topic_strength: "Highlights of KX SMART Play",
      title_strength1:
        "✅ Expert-designed courses tailored for effective learning",
      title_strength2:
        "✅ High-quality learning materials such as LEGO, electronics, and modern technology",
      title_strength3:
        "✅ Conveniently located at EmQuartier Mall for easy access",
      steam_topic: "STEAM Education",
      steam_info1:
        "STEAM is an educational concept that incorporates the first letters of",
      steam_info2: "Science",
      steam_info3: "Technology",
      steam_info4: "Engineering",
      steam_info5: "Art",
      steam_info6: "Mathematics",
      steam_info7: "together",
      steam_info8:
        "It takes place amidst technological innovations and major changes driven by artificial intelligence, with the aim of developing children into competitive individuals who can adapt to the future IT society through learning in these 5 fields.",
      topic_course: "Course content",
      title_target: "Target age",
      title_quantity: "Quantity",
      title_object: "Objective",
      title_getskill: "Skills to be acquired",
      course_name1: "Course: LEGO for Creative Foundation",
      course_name2: "Course: LEGO for Creative Problem Solving",
      course_name3: "Course: LEGO for Complex Problem Solving",
      course_name4:
        "Course: LEGO for Coding Skill (Icon Block) Via LEGO Spike Prime",
      course_name5:
        "Course: LEGO for Coding Skill (Word Block) Via LEGO Spike Prime",
      course_name6: "Course: Basic Electronic",
      target_age1: "4-6 Years",
      quantity1: "4 Sessions (1 Hour 30 Minutes per Session)",
      object1:
        "To strengthen children's muscles, concentration, creativity, problem-solving, communication, and readiness for LEGO-based Creative Problem Solving.",
      get_skill1: "Creativity, Communication, Concentration",
      target_age2: "4-9 Years",
      quantity2: "9 Sessions (1 Hour 30 Minutes per Session)",
      object2:
        "To develop observation skills, creativity, and systematic problem-solving skills. This course also enhances children's confidence, perseverance, and teamwork skills while creating projects using LEGO.",
      get_skill2: "Communication, Problem-Solving, Creativity",
      target_age3: "8-15 Years",
      quantity3: "5 Sessions (1 Hour 30 Minutes per Session)",
      object3:
        "To develop teamwork, creativity, systematic problem-solving, and skills related to Mechatronics. Students will learn to design and construct systems and complex machinery.",
      get_skill3: "Communication, Problem-Solving",
      target_age4: "6-15 Years",
      quantity4: "5 Sessions (1 Hour 30 Minutes per Session)",
      object4:
        "To develop and enhance students’ skills, especially in muscle coordination, concentration, creativity, problem-solving, communication, and preparation for basic programming (Word Block) using LEGO Spike Prime.",
      get_skill4: "Communication, Problem-Solving",
      target_age5: "8-15 Years",
      quantity5: "10 Sessions (1 hour 30 minutes per session)",
      object5:
        "To develop basic programming skills, creative thinking, problem-solving, systematic thinking, teamwork, and readiness to use advanced technology through block-based coding commands.",
      get_skill5: "Communication, Problem Solving, Systematic thinking",
      target_age6: "7-15 Years",
      quantity6: "10 Sessions (1 Hour 30 Minutes per Session)",
      object6:
        "To develop fundamental skills in science and technology by learning about electricity and electrical circuits in an easy-to-understand way. This course enhances logical thinking and problem-solving skills through hands-on experiments and self-built projects. It also stimulates creativity while ensuring that learners can use electronic tools and equipment safely.",
      get_skill6: "Communication, Problem Solving, Systematic thinking",
      head_aboutus: "About Us",
      topic_aboutus: "Mission KX SMART Play",
      title_mission: "Mission",
      title_vision: "Vision",
      title_value: "Value Proposition",
      title_key: "KEY MESSAGE",
      info_mission:
        "To create young innovators with a compassionate mindset who can solve problems and contribute positively to society (Young Compassionate Innovators).",
      info_vision:
        "To inspire and develop essential skills for the 21st century through STEAM Education, utilizing Play-based Learning and Project-based Learning approaches. This empowers children to explore their interests and potential in a fun and engaging way.",
      info_value:
        "Compassionate Innovation Mindset – A space for exploration, exchange, learning, and self-discovery.",
      info_key1:
        "Discover your identity, passions, and readiness to develop essential skills at KX SMART Play!",
      info_key2:
        "EXPLORE YOURSELF, YOUR INTEREST, YOUR ABILITY AND ENHANCE ESSENTIAL SOFT SKILL COMPETENCIES AT KX SMART Play!",
      topic_history: "Staff and instructors",
      title_history: "History and experience of the founder",
      info_history1:
        "KX SMART Play was founded by a team of experts from King Mongkut's University of Technology Thonburi (KMUTT) who are committed to developing youth with the skills they need for the future.",
      info_history2:
        "With teaching experience and research in science and technology, the founding team has developed a curriculum that combines play-based and hands-on learning to allow children to discover their own interests and talents.",
      title_member: "List of teachers and their expertise",
      member_name1: "Teacher [Name-Surname]",
      member_expertise1: "Expertise: LEGO Education, Coding",
      member_name2: "Teacher [Name-Surname]",
      member_expertise2: "Expertise: LEGO Education, Coding",
      member_name3: "Teacher [Name-Surname]",
      member_expertise3: "Expertise: LEGO Education, Coding",
      reviews: "Reviews from parents and students",
      more_details: "Contact Us",

      // Add more translations as needed
    },
    jp: {
      // Add Japanese translations here
      navAbout: "KX SMART Playとは",
      navCourse: "コース紹介",
      navAboutus: "アクセス",
      navTestimonials: "保護者や生徒からのレビュー",
      navContact: "お問い合わせ",
      quote:
        "KX SMART Play で自分自身、情熱、適性を見つけ、重要なスキルを開発してください。",
      top_about_title: "KX SMART Playとは？",
      info_para1:
        "KX SMART Play は、キングモンクット工科大学トンブリ校（KMUTT）によって開発された、21世紀に必要なスキルや自己発見を育む若きイノベーターのためのスペースです。",
      info_para2:
        "KX SMART Playでは、「Play-based Learning（遊びを通じた学習）」と「Project-based Learning（プロジェクト型学習）」の学び方を取り入れ、 STEAM教育に沿った全体的な教育体験を注目しています。",
      info_sub1: "🧑‍🔬 科学",
      info_sub2: "🧑‍💻 テクノロジー",
      info_sub3: "⚙️ エンジニアリング",
      info_sub4: "🎨 芸術",
      info_sub5: "➕ 数学",
      info_para3:
        "SMART PLAYのコースは、子供たちが効率的に学べるよう、全体的な知識と重要なスキルを育成することを目指しています。",
      info_para4: "🌟 KX SMART Playの学習環境 🌟",
      info_list1: "✅ 専門家からデサインされたコース　効率的な学習に合わせる",
      info_list2: "✅ 高品質の学習機器　LEGO、電子機器、現代のテクノロジー",
      info_list3: "✅ EmQuartierデパートに位置する　アクセスしやすい",
      topic_skill: "21世紀のスキル",
      skill1: "創造的思考とイノベーションの創出",
      skill2: "思考力・分析力・問題解決力",
      skill3: "効果的なコミュニケーション",
      skill4: "他者との協働",
      skill5: "テクノロジーを効果的に活用するスキル",
      video_text: "スマートプレイの雰囲気",
      topic_strength: "KX SMART Playのハイライト",
      title_strength1:
        "✅ 専門家からデサインされたコース　効率的な学習に合わせる",
      title_strength2:
        "✅ 高品質の学習機器　LEGO、電子機器、現代のテクノロジー",
      title_strength3: "✅ EmQuartierデパートに位置する　アクセスしやすい",
      steam_topic: "STEAM教育",
      steam_info1: "STEAMとは、の頭文字を組み合わせた教育概念です。",
      steam_info2: "科学",
      steam_info3: "テクノロジー",
      steam_info4: "エンジニアリング/建築",
      steam_info5: "芸術・リベラルアーツ",
      steam_info6: "数学",
      steam_info7: "一緒に",
      steam_info8:
        "子どもたちの成長を目的とした、人工知能の影響による技術革新や大きな変化のさなか。これら5つの分野を学び、これからのIT社会に適応し、競争できる人材を目指します。",
      topic_course: "コース内容",
      title_target: "対象年齢",
      title_quantity: "回数",
      title_object: "客観的",
      title_getskill: "習得すべきスキル",
      course_name1: "LEGO for Creative Foundaionのコース",
      course_name2: "LEGO for Creative Problem Solvingコース",
      course_name3: "LEGO for Complex Problem Solvingコース",
      course_name4:
        "LEGO for Coding Skill (Icon Block) Via LEGO Spike Primeコース",
      course_name5:
        "LEGO for Coding Skill (Word Block) Via LEGO Spike Primeコース",
      course_name6: "Basic Electronicコース",
      target_age1: "4～6年",
      quantity1: "4回 (１回１時間半)",
      object1:
        "微細運動スキル、集中力、創造力、思考力、問題解決力、そしてコミュニケーション能力を養い、「LEGO for Creative Problem Solving」に備えます。",
      get_skill1: "創造力, コミュニケーション能力, 集中力",
      target_age2: "4～9年",
      quantity2: "9 回 (１回１時間半)",
      object2:
        "観察力、創造力、論理的な問題解決能力、微細運動スキル、集中力を養い、LEGOを使った作品制作を通じて、自信を育成します。",
      get_skill2: "コミュニケーション能力, 問題解決力, 創造力",
      target_age3: "8～15年",
      quantity3: "5 回 (１回１時間半)",
      object3:
        "観察力、創造力、そして体系的な問題解決能力を育成し、 複雑なシステムや機械を設計・構築するためのメカトロニクス分野のスキルを養います",
      get_skill3: "コミュニケーション能力, 問題解決力",
      target_age4: "6～15年",
      quantity4: "5 回 (１回１時間半)",
      object4:
        "LEGO Spike Primeを通じて、微細運動スキル、集中力、創造力、問題解決力、コミュニケーション能力を開発・強化し、ベーシックプログラミング（Word Block）について学びます。",
      get_skill4: "コミュニケーション能力, 問題解決力, 体系的思考",
      target_age5: "8～15年",
      quantity5: "10 回 (１回１時間半)",
      object5:
        "プログラミングの基礎スキル、論理的思考、問題解決力、創造力、チームワークを育成し、ブロックコマンドを活用したロボット技術の活用準備を行います。",
      get_skill5: "コミュニケーション能力, 問題解決力, 体系的思考",
      target_age6: "7～15年",
      quantity6: "10 回 (１回１時間半)",
      object6:
        "科学技術の基礎スキルを養い、電気や電気回路の仕組みを分かりやすい形で学び、論理的思考や問題解決能力を、実験やものづくりを通じて向上させます。学習者は創造力を刺激し、電子機器やツールを安全に使用できるようになる。",
      get_skill6: "コミュニケーション能力, 問題解決力, 体系的思考",
      head_aboutus: "私たちについて",
      topic_aboutus: "ミッション KX SMART Play",
      title_mission: "ミッション",
      title_vision: "ビジョン",
      title_value: "バリュープロポジション",
      title_key: "キー・メッセージ",
      info_mission:
        "バランスの取れた知性と社会性を持つ若きイノベーターを育成する。",
      info_vision:
        " STEAM教育を通じた学びのプロセスを活用し、「Play-based Learning（遊びを通じた学習）」や「Project-based Learning（プロジェクト型学習）」を通じて21世紀に必要なスキルを育成し、自分自身の興味や得意分野を発見するきっかけを提供する。",
      info_value:
        " 思いやりのあるイノベーション・マインドセット － 探求、交流、学習、自己発見のためのスペース。",
      info_key1:
        " KX SMART Playで、自分の個性や情熱を見つけ、必要なスキルを育てよう！",
      info_key2:
        "自分自身、興味、能力を探求し、KX SMART PLAYで重要なソフトスキルを向上させよう！",
      topic_history: "スタッフとインストラクター",
      title_history: "創業者の歴史と経験",
      info_history1:
        "KX SMART Play は、将来に必要なスキルを備えた青少年の育成に尽力するキング モンクット工科大学トンブリ校 (KMUTT) の専門家チームによって設立されました。",
      info_history2:
        "科学技術の教育と研究の経験がある創設チームは、遊びによる学習と実践的な学習を組み合わせたカリキュラムを開発しました。子どもたちが自分の情熱と適性を発見した",
      title_member: "講師と専門知識のリスト",
      member_name1: "先生 [名前-姓]",
      member_expertise1: "専門知識: レゴ教育、コーディング",
      member_name2: "先生 [名前-姓]",
      member_expertise2: "専門知識: レゴ教育、コーディング",
      member_name3: "先生 [名前-姓]",
      member_expertise3: "専門知識: レゴ教育、コーディング",
      reviews: "保護者や生徒からのレビュー",
      more_details: "詳細についてはお問い合わせください。",
      // Add more translations as needed
    },
  };

  // Function to update text based on selected language
  function updateLanguage(lang) {
    currentLang = lang;

    // Update active button
    $(".lang-btn").removeClass("active");
    $(`.lang-btn[data-lang="${lang}"]`).addClass("active");

    // Update all elements with data-translate attribute
    $("[data-translate]").each(function () {
      const key = $(this).data("translate");
      if (translations[lang][key]) {
        $(this).text(translations[lang][key]);
      }
    });

    // Update images based on language
    updateImagesForLanguage(lang);

    // Save language preference
    localStorage.setItem("preferredLanguage", lang);
  }

  // Function to update images based on language
  function updateImagesForLanguage(lang) {
    console.log("Updating images for language:", lang);
    // Select all images with data-lang-{lang} attribute
    $(`img[data-lang-${lang}]`).each(function () {
      const newSrc = $(this).attr(`data-lang-${lang}`);
      if (newSrc) {
        console.log(
          `Changing image src from ${$(this).attr("src")} to ${newSrc}`
        );
        $(this).attr("src", newSrc);
      }
    });
  }

  // Handle language button clicks
  $(".lang-btn").on("click", function () {
    const lang = $(this).data("lang");
    updateLanguage(lang);
  });

  // Load saved language preference or default to Thai
  const savedLang = localStorage.getItem("preferredLanguage") || "th";
  updateLanguage(savedLang);
});

// Testimonial Slider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".testimonials-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".testimonial-dot");
  const prevBtn = document.querySelector(".testimonial-prev-btn");
  const nextBtn = document.querySelector(".testimonial-next-btn");

  let currentIndex = 0;
  const slideCount = slides.length;

  // ฟังก์ชันสำหรับเลื่อนไปยังสไลด์ที่ต้องการ
  function goToSlide(index) {
    if (index < 0) {
      index = slideCount - 1;
    } else if (index >= slideCount) {
      index = 0;
    }

    slider.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth",
    });

    // อัปเดตจุดแสดงตำแหน่งปัจจุบัน
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentIndex = index;
  }

  // เพิ่ม event listeners สำหรับปุ่มควบคุม
  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  // เพิ่ม event listeners สำหรับจุดแสดงตำแหน่ง
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // เริ่มต้นที่สไลด์แรก
  goToSlide(0);

  // เพิ่มการเลื่อนอัตโนมัติทุก 5 วินาที
  setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);
});

// เพิ่มฟังก์ชันสำหรับเปลี่ยนรูปภาพตามภาษา
function updateImagesForLanguage(lang) {
  console.log("Updating images for language:", lang);
  // เลือกรูปภาพทั้งหมดที่มี data attribute สำหรับภาษา
  const images = document.querySelectorAll(`img[data-lang-${lang}]`);

  // วนลูปเปลี่ยน src ของรูปภาพตามภาษาที่เลือก
  images.forEach((img) => {
    const newSrc = img.getAttribute(`data-lang-${lang}`);
    if (newSrc) {
      console.log(`Changing image src from ${img.src} to ${newSrc}`);
      img.src = newSrc;
    }
  });
}

// เมื่อเอกสารโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
  // ... โค้ดอื่นๆ ที่มีอยู่แล้ว ...

  // เลือกปุ่มภาษาทั้งหมด
  const langButtons = document.querySelectorAll(".lang-btn");

  // เพิ่ม event listener สำหรับแต่ละปุ่ม
  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // ลบคลาส active จากปุ่มทั้งหมด
      langButtons.forEach((btn) => btn.classList.remove("active"));

      // เพิ่มคลาส active ให้กับปุ่มที่ถูกคลิก
      this.classList.add("active");

      // ดึงค่าภาษาจาก data-lang attribute
      const lang = this.getAttribute("data-lang");
      console.log("Language selected:", lang);

      // เรียกใช้ฟังก์ชันเปลี่ยนภาษาของเนื้อหา (ที่มีอยู่แล้ว)
      changeLanguage(lang);

      // เรียกใช้ฟังก์ชันเปลี่ยนรูปภาพตามภาษา
      updateImagesForLanguage(lang);
    });
  });

  // ตรวจสอบว่ามีฟังก์ชัน changeLanguage หรือไม่
  // ถ้าไม่มี ให้สร้างฟังก์ชันนี้
  if (typeof changeLanguage !== "function") {
    window.changeLanguage = function (lang) {
      console.log("Changing language to:", lang);
      // โค้ดสำหรับเปลี่ยนภาษาของเนื้อหา
      const elements = document.querySelectorAll("[data-translate]");
      elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });
    };
  }
});

const base = import.meta.env.BASE_URL;

const UserImages = {
  home_Image: `${base}assets/home_logo.png`,
  about_Image: `${base}assets/about_logo.png`,
};

const SkillsImages = {
  html_logo: `${base}assets/html-logo.png`,
  css_logo: `${base}assets/css-logo.png`,
  js_logo: `${base}assets/JavaScript-logo.png`,
  react_logo: `${base}assets/react-logo.png`,
  tailwind_logo: `${base}assets/tailwind-logo.png`,
  bootstrap_logo: `${base}assets/bootstrap-logo.png`,
  flutter_logo: `${base}assets/flutter-logo.png`,
  mysql_logo: `${base}assets/mysql-logo.png`,
  firebase_logo: `${base}assets/fire-base-logo.png`,
  figma_logo: `${base}assets/figma-logo.png`,
  dart_logo: `${base}assets/dart-logo.png`,
};

const SoftwareImages = {
  vsCode_logo: `${base}assets/vs-code-logo.png`,
  github_logo: `${base}assets/github-logo.png`,
  android_studio_logo: `${base}assets/android-studio.png`,
};

const ProjectImages = {
  login_project: `${base}assets/project-login.png`,
  sherwin_project: `${base}assets/project-sherwin.png`,
  calculator_project: `${base}assets/project-calculator.png`,
  farmtracker_project: `${base}assets/project-farm-tracker.jpg`,
  docengage_project: `${base}assets/project-docengage.png`,
};

const OtherImages = {
  contact_bg: `${base}assets/contact-background.jpg`,
};

const Images = {
  UserImages,
  SkillsImages,
  SoftwareImages,
  ProjectImages,
  OtherImages,
};

export default Images;

import React from "react";

const About = ({ onClose }) => {
  return (
    <div className="about-overlay">
      <div className="about-content">
        <h2>Hakkında</h2>
        <p>
          Bu uygulama, gerçek zamanlı hava durumu bilgisi sunmak için OpenWeatherMap API'sini kullanır. 
          Kullanıcılar şehir araması yaparak anlık hava durumu verilerini alabilir ve hava durumuna uygun görsel arka plan deneyimi yaşayabilir.
        </p>
        <p>
          <strong>Geliştirici:</strong> Senin Adın <br />
          <strong>Tasarımcı:</strong> Senin Adın
        </p>
        <button onClick={onClose} className="close-btn">
          Kapat
        </button>
      </div>
    </div>
  );
};

export default About;


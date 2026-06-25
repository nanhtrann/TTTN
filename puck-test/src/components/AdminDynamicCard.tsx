import React from 'react';

export const AdminDynamicCard = ({ 
  title, 
  subtitle, 
  content, 
  imageUrl, 
  themeColor = "#f59e0b", 
  borderRadius = "8px", 
  items = [] 
}) => {
  return (
    <div style={{ 
      padding: '80px 40px', 
      backgroundColor: '#171717', 
      borderRadius: borderRadius,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Tiêu đề nổi bật nhất */}
      <h2 style={{ 
        color: '#60A5FA', 
        fontSize: '32px', 
        fontWeight: '800', 
        letterSpacing: '3px', 
        marginBottom: '50px', 
        textTransform: 'uppercase' 
      }}>
        GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP
      </h2>

      <div style={{ maxWidth: '1100px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', alignItems: 'center' }}>
          <div style={{ flex: '1' }}>
            {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} />}
          </div>

          <div style={{ flex: '1', color: '#fff', textAlign: 'left' }}>
            <h1 style={{ color: '#ffffff', fontSize: '40px', marginBottom: '20px' }}>{title}</h1>
            <h3 style={{ fontSize: '24px', marginBottom: '25px', color: '#e5e7eb' }}>{subtitle}</h3>
            <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '20px', whiteSpace: 'pre-line' }}>{content}</p>

            <div style={{ 
              marginTop: '40px', 
              padding: '30px', 
              backgroundColor: '#262626', 
              borderRadius: '12px',
              borderLeft: `8px solid ${themeColor}` 
            }}>
              {items?.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <strong style={{ color: '#fff', fontSize: '20px' }}>{item?.label}: </strong>
                  <span style={{ color: '#aaa', fontSize: '20px' }}>{item?.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
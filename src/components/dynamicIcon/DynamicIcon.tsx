import React, { useState, useEffect } from "react";

function DynamicIcon({ iconName }: { iconName: string | undefined }) {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Dynamically import the icon component based on the iconName
        const iconModule = await import(`@ant-design/icons/`);
        //TODO Fix this warning !
        if (iconName) {
          setIconComponent(iconModule[iconName]);
        }
      } catch (error) {
        console.error("Error loading icon:", error);
      }
    };
    // HomeFilled
    loadIcon();
  }, [iconName]);

  if (!IconComponent) return null;

  return React.createElement(IconComponent);
}

export default DynamicIcon;

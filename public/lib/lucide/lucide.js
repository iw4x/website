/**
 * lucide v0.263.0 - ISC
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lucide = {}));
})(this, (function (exports) { 'use strict';

  const createElement = (tag, attrs, children = []) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children.length) {
      children.forEach((child) => {
        const childElement = createElement(...child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  var createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);

  const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
  const getClassNames = (attrs) => {
    if (typeof attrs === "string")
      return attrs;
    if (!attrs || !attrs.class)
      return "";
    if (attrs.class && typeof attrs.class === "string") {
      return attrs.class.split(" ");
    }
    if (attrs.class && Array.isArray(attrs.class)) {
      return attrs.class;
    }
    return "";
  };
  const combineClassNames = (arrayOfClassnames) => {
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray.map((classItem) => classItem.trim()).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index).join(" ");
  };
  const toPascalCase = (string) => string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
  const replaceElement = (element, { nameAttr, icons, attrs }) => {
    const iconName = element.getAttribute(nameAttr);
    if (iconName == null)
      return;
    const ComponentName = toPascalCase(iconName);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
      return console.warn(
        `${element.outerHTML} icon name was not found in the provided icons object.`
      );
    }
    const elementAttrs = getAttrs(element);
    const [tag, iconAttributes, children] = iconNode;
    const iconAttrs = {
      ...iconAttributes,
      "data-lucide": iconName,
      ...attrs,
      ...elementAttrs
    };
    const classNames = combineClassNames(["lucide", `lucide-${iconName}`, elementAttrs, attrs]);
    if (classNames) {
      Object.assign(iconAttrs, {
        class: classNames
      });
    }
    const svgElement = createElement$1([tag, iconAttrs, children]);
    return element.parentNode?.replaceChild(svgElement, element);
  };

  const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  const Accessibility = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "16", cy: "4", r: "1" }],
      ["path", { d: "m18 19 1-7-6 1" }],
      ["path", { d: "m5 8 3-3 5.5 3-2.36 3.5" }],
      ["path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6" }],
      ["path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6" }]
    ]
  ];

  const ActivitySquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M17 12h-2l-2 5-2-10-2 5H7" }]
    ]
  ];

  const Activity = [
    "svg",
    defaultAttributes,
    [["path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }]]
  ];

  const AirVent = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
        }
      ],
      ["path", { d: "M6 8h12" }],
      [
        "path",
        { d: "M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" }
      ],
      ["path", { d: "M6.6 15.6A2 2 0 1 0 10 17v-5" }]
    ]
  ];

  const Airplay = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
        }
      ],
      ["polygon", { points: "12 15 17 21 7 21 12 15" }]
    ]
  ];

  const AlarmCheck = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "13", r: "8" }],
      ["path", { d: "M5 3 2 6" }],
      ["path", { d: "m22 6-3-3" }],
      ["path", { d: "M6.38 18.7 4 21" }],
      ["path", { d: "M17.64 18.67 20 21" }],
      ["path", { d: "m9 13 2 2 4-4" }]
    ]
  ];

  const AlarmClockOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6.87 6.87a8 8 0 1 0 11.26 11.26" }],
      ["path", { d: "M19.9 14.25a8 8 0 0 0-9.15-9.15" }],
      ["path", { d: "m22 6-3-3" }],
      ["path", { d: "M6.26 18.67 4 21" }],
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M4 4 2 6" }]
    ]
  ];

  const AlarmClock = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "13", r: "8" }],
      ["path", { d: "M12 9v4l2 2" }],
      ["path", { d: "M5 3 2 6" }],
      ["path", { d: "m22 6-3-3" }],
      ["path", { d: "M6.38 18.7 4 21" }],
      ["path", { d: "M17.64 18.67 20 21" }]
    ]
  ];

  const AlarmMinus = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "13", r: "8" }],
      ["path", { d: "M5 3 2 6" }],
      ["path", { d: "m22 6-3-3" }],
      ["path", { d: "M6.38 18.7 4 21" }],
      ["path", { d: "M17.64 18.67 20 21" }],
      ["path", { d: "M9 13h6" }]
    ]
  ];

  const AlarmPlus = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "13", r: "8" }],
      ["path", { d: "M5 3 2 6" }],
      ["path", { d: "m22 6-3-3" }],
      ["path", { d: "M6.38 18.7 4 21" }],
      ["path", { d: "M17.64 18.67 20 21" }],
      ["path", { d: "M12 10v6" }],
      ["path", { d: "M9 13h6" }]
    ]
  ];

  const Album = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["polyline", { points: "11 3 11 11 14 8 17 11 17 3" }]
    ]
  ];

  const AlertCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
    ]
  ];

  const AlertOctagon = [
    "svg",
    defaultAttributes,
    [
      [
        "polygon",
        {
          points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
        }
      ],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
    ]
  ];

  const AlertTriangle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
        }
      ],
      ["path", { d: "M12 9v4" }],
      ["path", { d: "M12 17h.01" }]
    ]
  ];

  const AlignCenterHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12h20" }],
      ["path", { d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" }],
      ["path", { d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" }],
      ["path", { d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1" }],
      ["path", { d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1" }]
    ]
  ];

  const AlignCenterVertical = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v20" }],
      ["path", { d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4" }],
      ["path", { d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4" }],
      ["path", { d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1" }],
      ["path", { d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" }]
    ]
  ];

  const AlignCenter = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "21", x2: "3", y1: "6", y2: "6" }],
      ["line", { x1: "17", x2: "7", y1: "12", y2: "12" }],
      ["line", { x1: "19", x2: "5", y1: "18", y2: "18" }]
    ]
  ];

  const AlignEndHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "16", x: "4", y: "2", rx: "2" }],
      ["rect", { width: "6", height: "9", x: "14", y: "9", rx: "2" }],
      ["path", { d: "M22 22H2" }]
    ]
  ];

  const AlignEndVertical = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "6", x: "2", y: "4", rx: "2" }],
      ["rect", { width: "9", height: "6", x: "9", y: "14", rx: "2" }],
      ["path", { d: "M22 22V2" }]
    ]
  ];

  const AlignHorizontalDistributeCenter = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
      ["path", { d: "M17 22v-5" }],
      ["path", { d: "M17 7V2" }],
      ["path", { d: "M7 22v-3" }],
      ["path", { d: "M7 5V2" }]
    ]
  ];

  const AlignHorizontalDistributeEnd = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
      ["path", { d: "M10 2v20" }],
      ["path", { d: "M20 2v20" }]
    ]
  ];

  const AlignHorizontalDistributeStart = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
      ["path", { d: "M4 2v20" }],
      ["path", { d: "M14 2v20" }]
    ]
  ];

  const AlignHorizontalJustifyCenter = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2" }],
      ["path", { d: "M12 2v20" }]
    ]
  ];

  const AlignHorizontalJustifyEnd = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "12", y: "7", rx: "2" }],
      ["path", { d: "M22 2v20" }]
    ]
  ];

  const AlignHorizontalJustifyStart = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "6", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2" }],
      ["path", { d: "M2 2v20" }]
    ]
  ];

  const AlignHorizontalSpaceAround = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "10", x: "9", y: "7", rx: "2" }],
      ["path", { d: "M4 22V2" }],
      ["path", { d: "M20 22V2" }]
    ]
  ];

  const AlignHorizontalSpaceBetween = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "14", x: "3", y: "5", rx: "2" }],
      ["rect", { width: "6", height: "10", x: "15", y: "7", rx: "2" }],
      ["path", { d: "M3 2v20" }],
      ["path", { d: "M21 2v20" }]
    ]
  ];

  const AlignJustify = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "3", x2: "21", y1: "6", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "12", y2: "12" }],
      ["line", { x1: "3", x2: "21", y1: "18", y2: "18" }]
    ]
  ];

  const AlignLeft = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "21", x2: "3", y1: "6", y2: "6" }],
      ["line", { x1: "15", x2: "3", y1: "12", y2: "12" }],
      ["line", { x1: "17", x2: "3", y1: "18", y2: "18" }]
    ]
  ];

  const AlignRight = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "21", x2: "3", y1: "6", y2: "6" }],
      ["line", { x1: "21", x2: "9", y1: "12", y2: "12" }],
      ["line", { x1: "21", x2: "7", y1: "18", y2: "18" }]
    ]
  ];

  const AlignStartHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "16", x: "4", y: "6", rx: "2" }],
      ["rect", { width: "6", height: "9", x: "14", y: "6", rx: "2" }],
      ["path", { d: "M22 2H2" }]
    ]
  ];

  const AlignStartVertical = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "9", height: "6", x: "6", y: "14", rx: "2" }],
      ["rect", { width: "16", height: "6", x: "6", y: "4", rx: "2" }],
      ["path", { d: "M2 2v20" }]
    ]
  ];

  const AlignVerticalDistributeCenter = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
      ["path", { d: "M22 7h-5" }],
      ["path", { d: "M7 7H1" }],
      ["path", { d: "M22 17h-3" }],
      ["path", { d: "M5 17H2" }]
    ]
  ];

  const AlignVerticalDistributeEnd = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
      ["path", { d: "M2 20h20" }],
      ["path", { d: "M2 10h20" }]
    ]
  ];

  const AlignVerticalDistributeStart = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
      ["path", { d: "M2 14h20" }],
      ["path", { d: "M2 4h20" }]
    ]
  ];

  const AlignVerticalJustifyCenter = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2" }],
      ["path", { d: "M2 12h20" }]
    ]
  ];

  const AlignVerticalJustifyEnd = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "12", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2" }],
      ["path", { d: "M2 22h20" }]
    ]
  ];

  const AlignVerticalJustifyStart = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "6", rx: "2" }],
      ["path", { d: "M2 2h20" }]
    ]
  ];

  const AlignVerticalSpaceAround = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "10", height: "6", x: "7", y: "9", rx: "2" }],
      ["path", { d: "M22 20H2" }],
      ["path", { d: "M22 4H2" }]
    ]
  ];

  const AlignVerticalSpaceBetween = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "6", x: "5", y: "15", rx: "2" }],
      ["rect", { width: "10", height: "6", x: "7", y: "3", rx: "2" }],
      ["path", { d: "M2 21h20" }],
      ["path", { d: "M2 3h20" }]
    ]
  ];

  const Ampersand = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"
        }
      ],
      ["path", { d: "M16 12h3" }]
    ]
  ];

  const Ampersands = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"
        }
      ],
      [
        "path",
        {
          d: "M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"
        }
      ]
    ]
  ];

  const Anchor = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "5", r: "3" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "8" }],
      ["path", { d: "M5 12H2a10 10 0 0 0 20 0h-3" }]
    ]
  ];

  const Angry = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2" }],
      ["path", { d: "M7.5 8 10 9" }],
      ["path", { d: "m14 9 2.5-1" }],
      ["path", { d: "M9 10h0" }],
      ["path", { d: "M15 10h0" }]
    ]
  ];

  const Annoyed = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M8 15h8" }],
      ["path", { d: "M8 9h2" }],
      ["path", { d: "M14 9h2" }]
    ]
  ];

  const Antenna = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12 7 2" }],
      ["path", { d: "m7 12 5-10" }],
      ["path", { d: "m12 12 5-10" }],
      ["path", { d: "m17 12 5-10" }],
      ["path", { d: "M4.5 7h15" }],
      ["path", { d: "M12 16v6" }]
    ]
  ];

  const Aperture = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "14.31", x2: "20.05", y1: "8", y2: "17.94" }],
      ["line", { x1: "9.69", x2: "21.17", y1: "8", y2: "8" }],
      ["line", { x1: "7.38", x2: "13.12", y1: "12", y2: "2.06" }],
      ["line", { x1: "9.69", x2: "3.95", y1: "16", y2: "6.06" }],
      ["line", { x1: "14.31", x2: "2.83", y1: "16", y2: "16" }],
      ["line", { x1: "16.62", x2: "10.88", y1: "12", y2: "21.94" }]
    ]
  ];

  const AppWindow = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
      ["path", { d: "M10 4v4" }],
      ["path", { d: "M2 8h20" }],
      ["path", { d: "M6 4v4" }]
    ]
  ];

  const Apple = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"
        }
      ],
      ["path", { d: "M10 2c1 .5 2 2 2 5" }]
    ]
  ];

  const ArchiveRestore = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "5", x: "2", y: "4", rx: "2" }],
      ["path", { d: "M12 13v7" }],
      ["path", { d: "m9 16 3-3 3 3" }],
      ["path", { d: "M4 9v9a2 2 0 0 0 2 2h2" }],
      ["path", { d: "M20 9v9a2 2 0 0 1-2 2h-2" }]
    ]
  ];

  const Archive = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "5", x: "2", y: "4", rx: "2" }],
      ["path", { d: "M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" }],
      ["path", { d: "M10 13h4" }]
    ]
  ];

  const AreaChart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["path", { d: "M7 12v5h12V8l-5 5-4-4Z" }]
    ]
  ];

  const Armchair = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" }],
      [
        "path",
        {
          d: "M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"
        }
      ],
      ["path", { d: "M5 18v2" }],
      ["path", { d: "M19 18v2" }]
    ]
  ];

  const ArrowBigDownDash = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 5H9" }],
      ["path", { d: "M15 9v3h4l-7 7-7-7h4V9h6z" }]
    ]
  ];

  const ArrowBigDown = [
    "svg",
    defaultAttributes,
    [["path", { d: "M15 6v6h4l-7 7-7-7h4V6h6z" }]]
  ];

  const ArrowBigLeftDash = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 15V9" }],
      ["path", { d: "M15 15h-3v4l-7-7 7-7v4h3v6z" }]
    ]
  ];

  const ArrowBigLeft = [
    "svg",
    defaultAttributes,
    [["path", { d: "M18 15h-6v4l-7-7 7-7v4h6v6z" }]]
  ];

  const ArrowBigRightDash = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 9v6" }],
      ["path", { d: "M9 9h3V5l7 7-7 7v-4H9V9z" }]
    ]
  ];

  const ArrowBigRight = [
    "svg",
    defaultAttributes,
    [["path", { d: "M6 9h6V5l7 7-7 7v-4H6V9z" }]]
  ];

  const ArrowBigUpDash = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 19h6" }],
      ["path", { d: "M9 15v-3H5l7-7 7 7h-4v3H9z" }]
    ]
  ];

  const ArrowBigUp = [
    "svg",
    defaultAttributes,
    [["path", { d: "M9 18v-6H5l7-7 7 7h-4v6H9z" }]]
  ];

  const ArrowDown01 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 20V4" }],
      ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2" }],
      ["path", { d: "M17 20v-6h-2" }],
      ["path", { d: "M15 20h4" }]
    ]
  ];

  const ArrowDown10 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 20V4" }],
      ["path", { d: "M17 10V4h-2" }],
      ["path", { d: "M15 10h4" }],
      ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2" }]
    ]
  ];

  const ArrowDownAZ = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 20V4" }],
      ["path", { d: "M20 8h-5" }],
      ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" }],
      ["path", { d: "M15 14h5l-5 6h5" }]
    ]
  ];

  const ArrowDownCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 8v8" }],
      ["path", { d: "m8 12 4 4 4-4" }]
    ]
  ];

  const ArrowDownFromLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 3H5" }],
      ["path", { d: "M12 21V7" }],
      ["path", { d: "m6 15 6 6 6-6" }]
    ]
  ];

  const ArrowDownLeftFromCircle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12a10 10 0 1 1 10 10" }],
      ["path", { d: "m2 22 10-10" }],
      ["path", { d: "M8 22H2v-6" }]
    ]
  ];

  const ArrowDownLeftSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m16 8-8 8" }],
      ["path", { d: "M16 16H8V8" }]
    ]
  ];

  const ArrowDownLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 7 7 17" }],
      ["path", { d: "M17 17H7V7" }]
    ]
  ];

  const ArrowDownNarrowWide = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 20V4" }],
      ["path", { d: "M11 4h4" }],
      ["path", { d: "M11 8h7" }],
      ["path", { d: "M11 12h10" }]
    ]
  ];

  const ArrowDownRightFromCircle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22a10 10 0 1 1 10-10" }],
      ["path", { d: "M22 22 12 12" }],
      ["path", { d: "M22 16v6h-6" }]
    ]
  ];

  const ArrowDownRightSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m8 8 8 8" }],
      ["path", { d: "M16 8v8H8" }]
    ]
  ];

  const ArrowDownRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 7 10 10" }],
      ["path", { d: "M17 7v10H7" }]
    ]
  ];

  const ArrowDownSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M12 8v8" }],
      ["path", { d: "m8 12 4 4 4-4" }]
    ]
  ];

  const ArrowDownToDot = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v14" }],
      ["path", { d: "m19 9-7 7-7-7" }],
      ["circle", { cx: "12", cy: "21", r: "1" }]
    ]
  ];

  const ArrowDownToLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 17V3" }],
      ["path", { d: "m6 11 6 6 6-6" }],
      ["path", { d: "M19 21H5" }]
    ]
  ];

  const ArrowDownUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 20V4" }],
      ["path", { d: "m21 8-4-4-4 4" }],
      ["path", { d: "M17 4v16" }]
    ]
  ];

  const ArrowDownWideNarrow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 20V4" }],
      ["path", { d: "M11 4h10" }],
      ["path", { d: "M11 8h7" }],
      ["path", { d: "M11 12h4" }]
    ]
  ];

  const ArrowDownZA = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 16 4 4 4-4" }],
      ["path", { d: "M7 4v16" }],
      ["path", { d: "M15 4h5l-5 6h5" }],
      ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" }],
      ["path", { d: "M20 18h-5" }]
    ]
  ];

  const ArrowDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 5v14" }],
      ["path", { d: "m19 12-7 7-7-7" }]
    ]
  ];

  const ArrowLeftCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M16 12H8" }],
      ["path", { d: "m12 8-4 4 4 4" }]
    ]
  ];

  const ArrowLeftFromLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 6-6 6 6 6" }],
      ["path", { d: "M3 12h14" }],
      ["path", { d: "M21 19V5" }]
    ]
  ];

  const ArrowLeftRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 3 4 7l4 4" }],
      ["path", { d: "M4 7h16" }],
      ["path", { d: "m16 21 4-4-4-4" }],
      ["path", { d: "M20 17H4" }]
    ]
  ];

  const ArrowLeftSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m12 8-4 4 4 4" }],
      ["path", { d: "M16 12H8" }]
    ]
  ];

  const ArrowLeftToLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 19V5" }],
      ["path", { d: "m13 6-6 6 6 6" }],
      ["path", { d: "M7 12h14" }]
    ]
  ];

  const ArrowLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m12 19-7-7 7-7" }],
      ["path", { d: "M19 12H5" }]
    ]
  ];

  const ArrowRightCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M8 12h8" }],
      ["path", { d: "m12 16 4-4-4-4" }]
    ]
  ];

  const ArrowRightFromLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 5v14" }],
      ["path", { d: "M21 12H7" }],
      ["path", { d: "m15 18 6-6-6-6" }]
    ]
  ];

  const ArrowRightLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m16 3 4 4-4 4" }],
      ["path", { d: "M20 7H4" }],
      ["path", { d: "m8 21-4-4 4-4" }],
      ["path", { d: "M4 17h16" }]
    ]
  ];

  const ArrowRightSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M8 12h8" }],
      ["path", { d: "m12 16 4-4-4-4" }]
    ]
  ];

  const ArrowRightToLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 12H3" }],
      ["path", { d: "m11 18 6-6-6-6" }],
      ["path", { d: "M21 5v14" }]
    ]
  ];

  const ArrowRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "m12 5 7 7-7 7" }]
    ]
  ];

  const ArrowUp01 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }],
      ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2" }],
      ["path", { d: "M17 20v-6h-2" }],
      ["path", { d: "M15 20h4" }]
    ]
  ];

  const ArrowUp10 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }],
      ["path", { d: "M17 10V4h-2" }],
      ["path", { d: "M15 10h4" }],
      ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2" }]
    ]
  ];

  const ArrowUpAZ = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }],
      ["path", { d: "M20 8h-5" }],
      ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" }],
      ["path", { d: "M15 14h5l-5 6h5" }]
    ]
  ];

  const ArrowUpCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m16 12-4-4-4 4" }],
      ["path", { d: "M12 16V8" }]
    ]
  ];

  const ArrowUpDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m21 16-4 4-4-4" }],
      ["path", { d: "M17 20V4" }],
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }]
    ]
  ];

  const ArrowUpFromDot = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m5 9 7-7 7 7" }],
      ["path", { d: "M12 16V2" }],
      ["circle", { cx: "12", cy: "21", r: "1" }]
    ]
  ];

  const ArrowUpFromLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m18 9-6-6-6 6" }],
      ["path", { d: "M12 3v14" }],
      ["path", { d: "M5 21h14" }]
    ]
  ];

  const ArrowUpLeftFromCircle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 8V2h6" }],
      ["path", { d: "m2 2 10 10" }],
      ["path", { d: "M12 2A10 10 0 1 1 2 12" }]
    ]
  ];

  const ArrowUpLeftSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M8 16V8h8" }],
      ["path", { d: "M16 16 8 8" }]
    ]
  ];

  const ArrowUpLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 17V7h10" }],
      ["path", { d: "M17 17 7 7" }]
    ]
  ];

  const ArrowUpNarrowWide = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }],
      ["path", { d: "M11 12h4" }],
      ["path", { d: "M11 16h7" }],
      ["path", { d: "M11 20h10" }]
    ]
  ];

  const ArrowUpRightFromCircle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 12A10 10 0 1 1 12 2" }],
      ["path", { d: "M22 2 12 12" }],
      ["path", { d: "M16 2h6v6" }]
    ]
  ];

  const ArrowUpRightSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M8 8h8v8" }],
      ["path", { d: "m8 16 8-8" }]
    ]
  ];

  const ArrowUpRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 7h10v10" }],
      ["path", { d: "M7 17 17 7" }]
    ]
  ];

  const ArrowUpSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m16 12-4-4-4 4" }],
      ["path", { d: "M12 16V8" }]
    ]
  ];

  const ArrowUpToLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 3h14" }],
      ["path", { d: "m18 13-6-6-6 6" }],
      ["path", { d: "M12 7v14" }]
    ]
  ];

  const ArrowUpWideNarrow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }],
      ["path", { d: "M11 12h10" }],
      ["path", { d: "M11 16h7" }],
      ["path", { d: "M11 20h4" }]
    ]
  ];

  const ArrowUpZA = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 8 4-4 4 4" }],
      ["path", { d: "M7 4v16" }],
      ["path", { d: "M15 4h5l-5 6h5" }],
      ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" }],
      ["path", { d: "M20 18h-5" }]
    ]
  ];

  const ArrowUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m5 12 7-7 7 7" }],
      ["path", { d: "M12 19V5" }]
    ]
  ];

  const ArrowsUpFromLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m4 6 3-3 3 3" }],
      ["path", { d: "M7 17V3" }],
      ["path", { d: "m14 6 3-3 3 3" }],
      ["path", { d: "M17 17V3" }],
      ["path", { d: "M4 21h16" }]
    ]
  ];

  const Asterisk = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 6v12" }],
      ["path", { d: "M17.196 9 6.804 15" }],
      ["path", { d: "m6.804 9 10.392 6" }]
    ]
  ];

  const AtSign = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" }]
    ]
  ];

  const Atom = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "1" }],
      [
        "path",
        {
          d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
        }
      ],
      [
        "path",
        {
          d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
        }
      ]
    ]
  ];

  const Award = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "8", r: "6" }],
      ["path", { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" }]
    ]
  ];

  const Axe = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" }],
      ["path", { d: "M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" }]
    ]
  ];

  const Axis3d = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 4v16h16" }],
      ["path", { d: "m4 20 7-7" }]
    ]
  ];

  const Baby = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 12h.01" }],
      ["path", { d: "M15 12h.01" }],
      ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" }],
      [
        "path",
        {
          d: "M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"
        }
      ]
    ]
  ];

  const Backpack = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
        }
      ],
      ["path", { d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" }],
      ["path", { d: "M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" }],
      ["path", { d: "M8 10h8" }],
      ["path", { d: "M8 18h8" }]
    ]
  ];

  const BadgeAlert = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
    ]
  ];

  const BadgeCheck = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["path", { d: "m9 12 2 2 4-4" }]
    ]
  ];

  const BadgeDollarSign = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
      ["path", { d: "M12 18V6" }]
    ]
  ];

  const BadgeHelp = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
      ["line", { x1: "12", x2: "12.01", y1: "17", y2: "17" }]
    ]
  ];

  const BadgeInfo = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["line", { x1: "12", x2: "12", y1: "16", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "8", y2: "8" }]
    ]
  ];

  const BadgeMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
    ]
  ];

  const BadgePercent = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["path", { d: "m15 9-6 6" }],
      ["path", { d: "M9 9h.01" }],
      ["path", { d: "M15 15h.01" }]
    ]
  ];

  const BadgePlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "16" }],
      ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
    ]
  ];

  const BadgeX = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ],
      ["line", { x1: "15", x2: "9", y1: "9", y2: "15" }],
      ["line", { x1: "9", x2: "15", y1: "9", y2: "15" }]
    ]
  ];

  const Badge = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        }
      ]
    ]
  ];

  const BaggageClaim = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" }],
      ["path", { d: "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" }],
      ["rect", { width: "13", height: "8", x: "8", y: "6", rx: "1" }],
      ["circle", { cx: "18", cy: "20", r: "2" }],
      ["circle", { cx: "9", cy: "20", r: "2" }]
    ]
  ];

  const Ban = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m4.9 4.9 14.2 14.2" }]
    ]
  ];

  const Banana = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" }],
      [
        "path",
        {
          d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"
        }
      ]
    ]
  ];

  const Banknote = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }],
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "M6 12h.01M18 12h.01" }]
    ]
  ];

  const BarChart2 = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "18", x2: "18", y1: "20", y2: "10" }],
      ["line", { x1: "12", x2: "12", y1: "20", y2: "4" }],
      ["line", { x1: "6", x2: "6", y1: "20", y2: "14" }]
    ]
  ];

  const BarChart3 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["path", { d: "M18 17V9" }],
      ["path", { d: "M13 17V5" }],
      ["path", { d: "M8 17v-3" }]
    ]
  ];

  const BarChart4 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["path", { d: "M13 17V9" }],
      ["path", { d: "M18 17V5" }],
      ["path", { d: "M8 17v-3" }]
    ]
  ];

  const BarChartBig = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["rect", { width: "4", height: "7", x: "7", y: "10", rx: "1" }],
      ["rect", { width: "4", height: "12", x: "15", y: "5", rx: "1" }]
    ]
  ];

  const BarChartHorizontalBig = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["rect", { width: "12", height: "4", x: "7", y: "5", rx: "1" }],
      ["rect", { width: "7", height: "4", x: "7", y: "13", rx: "1" }]
    ]
  ];

  const BarChartHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["path", { d: "M7 16h8" }],
      ["path", { d: "M7 11h12" }],
      ["path", { d: "M7 6h3" }]
    ]
  ];

  const BarChart = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "12", y1: "20", y2: "10" }],
      ["line", { x1: "18", x2: "18", y1: "20", y2: "4" }],
      ["line", { x1: "6", x2: "6", y1: "20", y2: "16" }]
    ]
  ];

  const Baseline = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 20h16" }],
      ["path", { d: "m6 16 6-12 6 12" }],
      ["path", { d: "M8 12h8" }]
    ]
  ];

  const Bath = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
        }
      ],
      ["line", { x1: "10", x2: "8", y1: "5", y2: "7" }],
      ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "7", x2: "7", y1: "19", y2: "21" }],
      ["line", { x1: "17", x2: "17", y1: "19", y2: "21" }]
    ]
  ];

  const BatteryCharging = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" }],
      ["path", { d: "m11 7-3 5h4l-3 5" }],
      ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }]
    ]
  ];

  const BatteryFull = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
      ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
      ["line", { x1: "6", x2: "6", y1: "11", y2: "13" }],
      ["line", { x1: "10", x2: "10", y1: "11", y2: "13" }],
      ["line", { x1: "14", x2: "14", y1: "11", y2: "13" }]
    ]
  ];

  const BatteryLow = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
      ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
      ["line", { x1: "6", x2: "6", y1: "11", y2: "13" }]
    ]
  ];

  const BatteryMedium = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
      ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
      ["line", { x1: "6", x2: "6", y1: "11", y2: "13" }],
      ["line", { x1: "10", x2: "10", y1: "11", y2: "13" }]
    ]
  ];

  const BatteryWarning = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 7h2a2 2 0 0 1 2 2v6c0 1-1 2-2 2h-2" }],
      ["path", { d: "M6 7H4a2 2 0 0 0-2 2v6c0 1 1 2 2 2h2" }],
      ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
      ["line", { x1: "10", x2: "10", y1: "7", y2: "13" }],
      ["line", { x1: "10", x2: "10", y1: "17", y2: "17.01" }]
    ]
  ];

  const Battery = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
      ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }]
    ]
  ];

  const Beaker = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4.5 3h15" }],
      ["path", { d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" }],
      ["path", { d: "M6 14h12" }]
    ]
  ];

  const BeanOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"
        }
      ],
      ["path", { d: "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66" }],
      [
        "path",
        {
          d: "M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Bean = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"
        }
      ],
      ["path", { d: "M5.341 10.62a4 4 0 1 0 5.279-5.28" }]
    ]
  ];

  const BedDouble = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" }],
      ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }],
      ["path", { d: "M12 4v6" }],
      ["path", { d: "M2 18h20" }]
    ]
  ];

  const BedSingle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" }],
      ["path", { d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" }],
      ["path", { d: "M3 18h18" }]
    ]
  ];

  const Bed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 4v16" }],
      ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10" }],
      ["path", { d: "M2 17h20" }],
      ["path", { d: "M6 8v9" }]
    ]
  ];

  const Beef = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12.5", cy: "8.5", r: "2.5" }],
      [
        "path",
        {
          d: "M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"
        }
      ],
      [
        "path",
        {
          d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"
        }
      ]
    ]
  ];

  const Beer = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 11h1a3 3 0 0 1 0 6h-1" }],
      ["path", { d: "M9 12v6" }],
      ["path", { d: "M13 12v6" }],
      [
        "path",
        {
          d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"
        }
      ],
      ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" }]
    ]
  ];

  const BellDot = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3"
        }
      ],
      ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
      ["circle", { cx: "18", cy: "8", r: "3" }]
    ]
  ];

  const BellMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18.4 12c.8 3.8 2.6 5 2.6 5H3s3-2 3-9c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2"
        }
      ],
      ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
      ["path", { d: "M15 8h6" }]
    ]
  ];

  const BellOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5" }],
      ["path", { d: "M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7" }],
      ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
      ["path", { d: "m2 2 20 20" }]
    ]
  ];

  const BellPlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7"
        }
      ],
      ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
      ["path", { d: "M15 8h6" }],
      ["path", { d: "M18 5v6" }]
    ]
  ];

  const BellRing = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }],
      ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
      ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8" }],
      ["path", { d: "M22 8c0-2.3-.8-4.3-2-6" }]
    ]
  ];

  const Bell = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }],
      ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
    ]
  ];

  const Bike = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18.5", cy: "17.5", r: "3.5" }],
      ["circle", { cx: "5.5", cy: "17.5", r: "3.5" }],
      ["circle", { cx: "15", cy: "5", r: "1" }],
      ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2" }]
    ]
  ];

  const Binary = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2" }],
      ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2" }],
      ["path", { d: "M6 20h4" }],
      ["path", { d: "M14 10h4" }],
      ["path", { d: "M6 14h2v6" }],
      ["path", { d: "M14 4h2v6" }]
    ]
  ];

  const Biohazard = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "11.9", r: "2" }],
      ["path", { d: "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" }],
      ["path", { d: "m8.9 10.1 1.4.8" }],
      ["path", { d: "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" }],
      ["path", { d: "m15.1 10.1-1.4.8" }],
      [
        "path",
        { d: "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" }
      ],
      ["path", { d: "M12 13.9v1.6" }],
      ["path", { d: "M13.5 5.4c-1-.2-2-.2-3 0" }],
      ["path", { d: "M17 16.4c.7-.7 1.2-1.6 1.5-2.5" }],
      ["path", { d: "M5.5 13.9c.3.9.8 1.8 1.5 2.5" }]
    ]
  ];

  const Bird = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 7h.01" }],
      ["path", { d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" }],
      ["path", { d: "m20 7 2 .5-2 .5" }],
      ["path", { d: "M10 18v3" }],
      ["path", { d: "M14 17.75V21" }],
      ["path", { d: "M7 18a6 6 0 0 0 3.84-10.61" }]
    ]
  ];

  const Bitcoin = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"
        }
      ]
    ]
  ];

  const Blinds = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3h18" }],
      ["path", { d: "M20 7H8" }],
      ["path", { d: "M20 11H8" }],
      ["path", { d: "M10 19h10" }],
      ["path", { d: "M8 15h12" }],
      ["path", { d: "M4 3v14" }],
      ["circle", { cx: "4", cy: "19", r: "2" }]
    ]
  ];

  const BluetoothConnected = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }],
      ["line", { x1: "18", x2: "21", y1: "12", y2: "12" }],
      ["line", { x1: "3", x2: "6", y1: "12", y2: "12" }]
    ]
  ];

  const BluetoothOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m17 17-5 5V12l-5 5" }],
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M14.5 9.5 17 7l-5-5v4.5" }]
    ]
  ];

  const BluetoothSearching = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }],
      ["path", { d: "M20.83 14.83a4 4 0 0 0 0-5.66" }],
      ["path", { d: "M18 12h.01" }]
    ]
  ];

  const Bluetooth = [
    "svg",
    defaultAttributes,
    [["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }]]
  ];

  const Bold = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 12a4 4 0 0 0 0-8H6v8" }],
      ["path", { d: "M15 20a4 4 0 0 0 0-8H6v8Z" }]
    ]
  ];

  const Bomb = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11", cy: "13", r: "9" }],
      [
        "path",
        {
          d: "m19.5 9.5 1.8-1.8a2.4 2.4 0 0 0 0-3.4l-1.6-1.6a2.41 2.41 0 0 0-3.4 0l-1.8 1.8"
        }
      ],
      ["path", { d: "m22 2-1.5 1.5" }]
    ]
  ];

  const Bone = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"
        }
      ]
    ]
  ];

  const BookCopy = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 16V4a2 2 0 0 1 2-2h11" }],
      ["path", { d: "M5 14H4a2 2 0 1 0 0 4h1" }],
      ["path", { d: "M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12" }]
    ]
  ];

  const BookDown = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ],
      ["path", { d: "M12 13V7" }],
      ["path", { d: "m9 10 3 3 3-3" }]
    ]
  ];

  const BookKey = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H14" }],
      ["path", { d: "M20 8v14H6.5a2.5 2.5 0 0 1 0-5H20" }],
      ["circle", { cx: "14", cy: "8", r: "2" }],
      ["path", { d: "m20 2-4.5 4.5" }],
      ["path", { d: "m19 3 1 1" }]
    ]
  ];

  const BookLock = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" }],
      ["path", { d: "M20 15v7H6.5a2.5 2.5 0 0 1 0-5H20" }],
      ["rect", { width: "8", height: "5", x: "12", y: "6", rx: "1" }],
      ["path", { d: "M18 6V4a2 2 0 1 0-4 0v2" }]
    ]
  ];

  const BookMarked = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ],
      ["polyline", { points: "10 2 10 10 13 7 16 10 16 2" }]
    ]
  ];

  const BookMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ],
      ["path", { d: "M9 10h6" }]
    ]
  ];

  const BookOpenCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" }],
      ["path", { d: "m16 12 2 2 4-4" }],
      ["path", { d: "M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" }]
    ]
  ];

  const BookOpen = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }],
      ["path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }]
    ]
  ];

  const BookPlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ],
      ["path", { d: "M9 10h6" }],
      ["path", { d: "M12 7v6" }]
    ]
  ];

  const BookTemplate = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 22h-2" }],
      ["path", { d: "M20 15v2h-2" }],
      ["path", { d: "M4 19.5V15" }],
      ["path", { d: "M20 8v3" }],
      ["path", { d: "M18 2h2v2" }],
      ["path", { d: "M4 11V9" }],
      ["path", { d: "M12 2h2" }],
      ["path", { d: "M12 22h2" }],
      ["path", { d: "M12 17h2" }],
      ["path", { d: "M8 22H6.5a2.5 2.5 0 0 1 0-5H8" }],
      ["path", { d: "M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8" }]
    ]
  ];

  const BookUp2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" }],
      ["path", { d: "M18 2h2v20H6.5a2.5 2.5 0 0 1 0-5H20" }],
      ["path", { d: "M12 13V7" }],
      ["path", { d: "m9 10 3-3 3 3" }],
      ["path", { d: "m9 5 3-3 3 3" }]
    ]
  ];

  const BookUp = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ],
      ["path", { d: "M12 13V7" }],
      ["path", { d: "m9 10 3-3 3 3" }]
    ]
  ];

  const BookX = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ],
      ["path", { d: "m14.5 7-5 5" }],
      ["path", { d: "m9.5 7 5 5" }]
    ]
  ];

  const Book = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }
      ]
    ]
  ];

  const BookmarkMinus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }],
      ["line", { x1: "15", x2: "9", y1: "10", y2: "10" }]
    ]
  ];

  const BookmarkPlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }],
      ["line", { x1: "12", x2: "12", y1: "7", y2: "13" }],
      ["line", { x1: "15", x2: "9", y1: "10", y2: "10" }]
    ]
  ];

  const Bookmark = [
    "svg",
    defaultAttributes,
    [["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }]]
  ];

  const BoomBox = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }],
      ["path", { d: "M8 8v1" }],
      ["path", { d: "M12 8v1" }],
      ["path", { d: "M16 8v1" }],
      ["rect", { width: "20", height: "12", x: "2", y: "9", rx: "2" }],
      ["circle", { cx: "8", cy: "15", r: "2" }],
      ["circle", { cx: "16", cy: "15", r: "2" }]
    ]
  ];

  const Bot = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "10", x: "3", y: "11", rx: "2" }],
      ["circle", { cx: "12", cy: "5", r: "2" }],
      ["path", { d: "M12 7v4" }],
      ["line", { x1: "8", x2: "8", y1: "16", y2: "16" }],
      ["line", { x1: "16", x2: "16", y1: "16", y2: "16" }]
    ]
  ];

  const BoxSelect = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
      ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
      ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
      ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
      ["path", { d: "M9 3h1" }],
      ["path", { d: "M9 21h1" }],
      ["path", { d: "M14 3h1" }],
      ["path", { d: "M14 21h1" }],
      ["path", { d: "M3 9v1" }],
      ["path", { d: "M21 9v1" }],
      ["path", { d: "M3 14v1" }],
      ["path", { d: "M21 14v1" }]
    ]
  ];

  const Box = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        }
      ],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
    ]
  ];

  const Boxes = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"
        }
      ],
      ["path", { d: "m7 16.5-4.74-2.85" }],
      ["path", { d: "m7 16.5 5-3" }],
      ["path", { d: "M7 16.5v5.17" }],
      [
        "path",
        {
          d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"
        }
      ],
      ["path", { d: "m17 16.5-5-3" }],
      ["path", { d: "m17 16.5 4.74-2.85" }],
      ["path", { d: "M17 16.5v5.17" }],
      [
        "path",
        {
          d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"
        }
      ],
      ["path", { d: "M12 8 7.26 5.15" }],
      ["path", { d: "m12 8 4.74-2.85" }],
      ["path", { d: "M12 13.5V8" }]
    ]
  ];

  const Braces = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"
        }
      ],
      [
        "path",
        {
          d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
        }
      ]
    ]
  ];

  const Brackets = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 3h3v18h-3" }],
      ["path", { d: "M8 21H5V3h3" }]
    ]
  ];

  const BrainCircuit = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"
        }
      ],
      ["path", { d: "M16 8V5c0-1.1.9-2 2-2" }],
      ["path", { d: "M12 13h4" }],
      ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1" }],
      ["path", { d: "M12 8h8" }],
      ["path", { d: "M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" }],
      ["path", { d: "M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" }],
      ["path", { d: "M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" }],
      ["path", { d: "M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" }]
    ]
  ];

  const BrainCog = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 9.5 22c1.21 0 2.5-.74 2.5-2.5m0-15a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 14.5 22c-1.21 0-2.5-.74-2.5-2.5m0-15V5m0 14.5V19"
        }
      ],
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "M12 9v1" }],
      ["path", { d: "M12 14v1" }],
      ["path", { d: "m14.6 10.5-.87.5" }],
      ["path", { d: "m10.27 13-.87.5" }],
      ["path", { d: "m14.6 13.5-.87-.5" }],
      ["path", { d: "m10.27 11-.87-.5" }]
    ]
  ];

  const Brain = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"
        }
      ],
      [
        "path",
        {
          d: "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"
        }
      ]
    ]
  ];

  const Briefcase = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "14", x: "2", y: "7", rx: "2", ry: "2" }],
      ["path", { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }]
    ]
  ];

  const BringToFront = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "2" }],
      ["path", { d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" }],
      ["path", { d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" }]
    ]
  ];

  const Brush = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" }
      ],
      [
        "path",
        {
          d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"
        }
      ]
    ]
  ];

  const Bug = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "14", x: "8", y: "6", rx: "4" }],
      ["path", { d: "m19 7-3 2" }],
      ["path", { d: "m5 7 3 2" }],
      ["path", { d: "m19 19-3-2" }],
      ["path", { d: "m5 19 3-2" }],
      ["path", { d: "M20 13h-4" }],
      ["path", { d: "M4 13h4" }],
      ["path", { d: "m10 4 1 2" }],
      ["path", { d: "m14 4-1 2" }]
    ]
  ];

  const Building2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }],
      ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }],
      ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M10 6h4" }],
      ["path", { d: "M10 10h4" }],
      ["path", { d: "M10 14h4" }],
      ["path", { d: "M10 18h4" }]
    ]
  ];

  const Building = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
      ["path", { d: "M9 22v-4h6v4" }],
      ["path", { d: "M8 6h.01" }],
      ["path", { d: "M16 6h.01" }],
      ["path", { d: "M12 6h.01" }],
      ["path", { d: "M12 10h.01" }],
      ["path", { d: "M12 14h.01" }],
      ["path", { d: "M16 10h.01" }],
      ["path", { d: "M16 14h.01" }],
      ["path", { d: "M8 10h.01" }],
      ["path", { d: "M8 14h.01" }]
    ]
  ];

  const Bus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A3 3 0 0 0 17.66 5H4a2 2 0 0 0-2 2v10h2"
        }
      ],
      ["path", { d: "M14 17H9" }],
      ["circle", { cx: "6.5", cy: "17.5", r: "2.5" }],
      ["circle", { cx: "16.5", cy: "17.5", r: "2.5" }]
    ]
  ];

  const Cable = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 9a2 2 0 0 1-2-2V5h6v2a2 2 0 0 1-2 2Z" }],
      ["path", { d: "M3 5V3" }],
      ["path", { d: "M7 5V3" }],
      ["path", { d: "M19 15V6.5a3.5 3.5 0 0 0-7 0v11a3.5 3.5 0 0 1-7 0V9" }],
      ["path", { d: "M17 21v-2" }],
      ["path", { d: "M21 21v-2" }],
      ["path", { d: "M22 19h-6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z" }]
    ]
  ];

  const CakeSlice = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "9", cy: "7", r: "2" }],
      [
        "path",
        {
          d: "M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"
        }
      ],
      ["path", { d: "M16 13H3" }],
      ["path", { d: "M16 17H3" }]
    ]
  ];

  const Cake = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" }],
      ["path", { d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" }],
      ["path", { d: "M2 21h20" }],
      ["path", { d: "M7 8v2" }],
      ["path", { d: "M12 8v2" }],
      ["path", { d: "M17 8v2" }],
      ["path", { d: "M7 4h.01" }],
      ["path", { d: "M12 4h.01" }],
      ["path", { d: "M17 4h.01" }]
    ]
  ];

  const Calculator = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
      ["line", { x1: "8", x2: "16", y1: "6", y2: "6" }],
      ["line", { x1: "16", x2: "16", y1: "14", y2: "18" }],
      ["path", { d: "M16 10h.01" }],
      ["path", { d: "M12 10h.01" }],
      ["path", { d: "M8 10h.01" }],
      ["path", { d: "M12 14h.01" }],
      ["path", { d: "M8 14h.01" }],
      ["path", { d: "M12 18h.01" }],
      ["path", { d: "M8 18h.01" }]
    ]
  ];

  const CalendarCheck2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }
      ],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["path", { d: "m16 20 2 2 4-4" }]
    ]
  ];

  const CalendarCheck = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["path", { d: "m9 16 2 2 4-4" }]
    ]
  ];

  const CalendarClock = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" }
      ],
      ["path", { d: "M16 2v4" }],
      ["path", { d: "M8 2v4" }],
      ["path", { d: "M3 10h5" }],
      ["path", { d: "M17.5 17.5 16 16.25V14" }],
      ["path", { d: "M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" }]
    ]
  ];

  const CalendarDays = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["path", { d: "M8 14h.01" }],
      ["path", { d: "M12 14h.01" }],
      ["path", { d: "M16 14h.01" }],
      ["path", { d: "M8 18h.01" }],
      ["path", { d: "M12 18h.01" }],
      ["path", { d: "M16 18h.01" }]
    ]
  ];

  const CalendarHeart = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7" }
      ],
      ["path", { d: "M16 2v4" }],
      ["path", { d: "M8 2v4" }],
      ["path", { d: "M3 10h18" }],
      [
        "path",
        {
          d: "M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"
        }
      ]
    ]
  ];

  const CalendarMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }
      ],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["line", { x1: "16", x2: "22", y1: "19", y2: "19" }]
    ]
  ];

  const CalendarOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" }
      ],
      ["path", { d: "M21 15.5V6a2 2 0 0 0-2-2H9.5" }],
      ["path", { d: "M16 2v4" }],
      ["path", { d: "M3 10h7" }],
      ["path", { d: "M21 10h-5.5" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const CalendarPlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }
      ],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["line", { x1: "19", x2: "19", y1: "16", y2: "22" }],
      ["line", { x1: "16", x2: "22", y1: "19", y2: "19" }]
    ]
  ];

  const CalendarRange = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["path", { d: "M17 14h-6" }],
      ["path", { d: "M13 18H7" }],
      ["path", { d: "M7 14h.01" }],
      ["path", { d: "M17 18h.01" }]
    ]
  ];

  const CalendarSearch = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5" }
      ],
      ["path", { d: "M16 2v4" }],
      ["path", { d: "M8 2v4" }],
      ["path", { d: "M3 10h18" }],
      ["path", { d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z" }],
      ["path", { d: "m22 22-1.5-1.5" }]
    ]
  ];

  const CalendarX2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }
      ],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["line", { x1: "17", x2: "22", y1: "17", y2: "22" }],
      ["line", { x1: "17", x2: "22", y1: "22", y2: "17" }]
    ]
  ];

  const CalendarX = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }],
      ["line", { x1: "10", x2: "14", y1: "14", y2: "18" }],
      ["line", { x1: "14", x2: "10", y1: "14", y2: "18" }]
    ]
  ];

  const Calendar = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10" }]
    ]
  ];

  const CameraOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
      ["path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }],
      ["path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }],
      ["path", { d: "M14.121 15.121A3 3 0 1 1 9.88 10.88" }]
    ]
  ];

  const Camera = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
        }
      ],
      ["circle", { cx: "12", cy: "13", r: "3" }]
    ]
  ];

  const CandlestickChart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 5v4" }],
      ["rect", { width: "4", height: "6", x: "7", y: "9", rx: "1" }],
      ["path", { d: "M9 15v2" }],
      ["path", { d: "M17 3v2" }],
      ["rect", { width: "4", height: "8", x: "15", y: "5", rx: "1" }],
      ["path", { d: "M17 13v3" }],
      ["path", { d: "M3 3v18h18" }]
    ]
  ];

  const CandyCane = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z"
        }
      ],
      ["path", { d: "M17.75 7 15 2.1" }],
      ["path", { d: "M10.9 4.8 13 9" }],
      ["path", { d: "m7.9 9.7 2 4.4" }],
      ["path", { d: "M4.9 14.7 7 18.9" }]
    ]
  ];

  const CandyOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m8.5 8.5-1 1a4.95 4.95 0 0 0 7 7l1-1" }],
      [
        "path",
        {
          d: "M11.843 6.187A4.947 4.947 0 0 1 16.5 7.5a4.947 4.947 0 0 1 1.313 4.657"
        }
      ],
      ["path", { d: "M14 16.5V14" }],
      ["path", { d: "M14 6.5v1.843" }],
      ["path", { d: "M10 10v7.5" }],
      [
        "path",
        {
          d: "m16 7 1-5 1.367.683A3 3 0 0 0 19.708 3H21v1.292a3 3 0 0 0 .317 1.341L22 7l-5 1"
        }
      ],
      [
        "path",
        {
          d: "m8 17-1 5-1.367-.683A3 3 0 0 0 4.292 21H3v-1.292a3 3 0 0 0-.317-1.341L2 17l5-1"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Candy = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z" }
      ],
      ["path", { d: "M14 6.5v10" }],
      ["path", { d: "M10 7.5v10" }],
      [
        "path",
        {
          d: "m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1"
        }
      ],
      [
        "path",
        {
          d: "m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1"
        }
      ]
    ]
  ];

  const Car = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"
        }
      ],
      ["circle", { cx: "6.5", cy: "16.5", r: "2.5" }],
      ["circle", { cx: "16.5", cy: "16.5", r: "2.5" }]
    ]
  ];

  const Carrot = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"
        }
      ],
      [
        "path",
        { d: "M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" }
      ],
      [
        "path",
        { d: "M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" }
      ]
    ]
  ];

  const CaseLower = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "7", cy: "12", r: "3" }],
      ["path", { d: "M10 9v6" }],
      ["circle", { cx: "17", cy: "12", r: "3" }],
      ["path", { d: "M14 7v8" }]
    ]
  ];

  const CaseSensitive = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 15 4-8 4 8" }],
      ["path", { d: "M4 13h6" }],
      ["circle", { cx: "18", cy: "12", r: "3" }],
      ["path", { d: "M21 9v6" }]
    ]
  ];

  const CaseUpper = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 15 4-8 4 8" }],
      ["path", { d: "M4 13h6" }],
      ["path", { d: "M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4" }]
    ]
  ];

  const CassetteTape = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
      ["circle", { cx: "8", cy: "10", r: "2" }],
      ["path", { d: "M8 12h8" }],
      ["circle", { cx: "16", cy: "10", r: "2" }],
      [
        "path",
        { d: "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" }
      ]
    ]
  ];

  const Cast = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" }
      ],
      ["path", { d: "M2 12a9 9 0 0 1 8 8" }],
      ["path", { d: "M2 16a5 5 0 0 1 4 4" }],
      ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20" }]
    ]
  ];

  const Castle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" }],
      ["path", { d: "M18 11V4H6v7" }],
      ["path", { d: "M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4" }],
      ["path", { d: "M22 11V9" }],
      ["path", { d: "M2 11V9" }],
      ["path", { d: "M6 4V2" }],
      ["path", { d: "M18 4V2" }],
      ["path", { d: "M10 4V2" }],
      ["path", { d: "M14 4V2" }]
    ]
  ];

  const Cat = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
        }
      ],
      ["path", { d: "M8 14v.5" }],
      ["path", { d: "M16 14v.5" }],
      ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z" }]
    ]
  ];

  const CheckCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 6 7 17l-5-5" }],
      ["path", { d: "m22 10-7.5 7.5L13 16" }]
    ]
  ];

  const CheckCircle2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        }
      ],
      ["path", { d: "m9 12 2 2 4-4" }]
    ]
  ];

  const CheckCircle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }],
      ["polyline", { points: "22 4 12 14.01 9 11.01" }]
    ]
  ];

  const CheckSquare = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "9 11 12 14 22 4" }],
      [
        "path",
        { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" }
      ]
    ]
  ];

  const Check = [
    "svg",
    defaultAttributes,
    [["polyline", { points: "20 6 9 17 4 12" }]]
  ];

  const ChefHat = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"
        }
      ],
      ["line", { x1: "6", x2: "18", y1: "17", y2: "17" }]
    ]
  ];

  const Cherry = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" }],
      ["path", { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" }],
      ["path", { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" }],
      ["path", { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" }]
    ]
  ];

  const ChevronDownCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m16 10-4 4-4-4" }]
    ]
  ];

  const ChevronDownSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m16 10-4 4-4-4" }]
    ]
  ];

  const ChevronDown = [
    "svg",
    defaultAttributes,
    [["path", { d: "m6 9 6 6 6-6" }]]
  ];

  const ChevronFirst = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m17 18-6-6 6-6" }],
      ["path", { d: "M7 6v12" }]
    ]
  ];

  const ChevronLast = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 18 6-6-6-6" }],
      ["path", { d: "M17 6v12" }]
    ]
  ];

  const ChevronLeftCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m14 16-4-4 4-4" }]
    ]
  ];

  const ChevronLeftSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m14 16-4-4 4-4" }]
    ]
  ];

  const ChevronLeft = [
    "svg",
    defaultAttributes,
    [["path", { d: "m15 18-6-6 6-6" }]]
  ];

  const ChevronRightCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m10 8 4 4-4 4" }]
    ]
  ];

  const ChevronRightSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m10 8 4 4-4 4" }]
    ]
  ];

  const ChevronRight = [
    "svg",
    defaultAttributes,
    [["path", { d: "m9 18 6-6-6-6" }]]
  ];

  const ChevronUpCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m8 14 4-4 4 4" }]
    ]
  ];

  const ChevronUpSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m8 14 4-4 4 4" }]
    ]
  ];

  const ChevronUp = [
    "svg",
    defaultAttributes,
    [["path", { d: "m18 15-6-6-6 6" }]]
  ];

  const ChevronsDownUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 20 5-5 5 5" }],
      ["path", { d: "m7 4 5 5 5-5" }]
    ]
  ];

  const ChevronsDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 6 5 5 5-5" }],
      ["path", { d: "m7 13 5 5 5-5" }]
    ]
  ];

  const ChevronsLeftRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 7-5 5 5 5" }],
      ["path", { d: "m15 7 5 5-5 5" }]
    ]
  ];

  const ChevronsLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m11 17-5-5 5-5" }],
      ["path", { d: "m18 17-5-5 5-5" }]
    ]
  ];

  const ChevronsRightLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m20 17-5-5 5-5" }],
      ["path", { d: "m4 17 5-5-5-5" }]
    ]
  ];

  const ChevronsRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m6 17 5-5-5-5" }],
      ["path", { d: "m13 17 5-5-5-5" }]
    ]
  ];

  const ChevronsUpDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 15 5 5 5-5" }],
      ["path", { d: "m7 9 5-5 5 5" }]
    ]
  ];

  const ChevronsUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m17 11-5-5-5 5" }],
      ["path", { d: "m17 18-5-5-5 5" }]
    ]
  ];

  const Chrome = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["line", { x1: "21.17", x2: "12", y1: "8", y2: "8" }],
      ["line", { x1: "3.95", x2: "8.54", y1: "6.06", y2: "14" }],
      ["line", { x1: "10.88", x2: "15.46", y1: "21.94", y2: "14" }]
    ]
  ];

  const Church = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2" }],
      ["path", { d: "M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" }],
      ["path", { d: "M18 22V5l-6-3-6 3v17" }],
      ["path", { d: "M12 7v5" }],
      ["path", { d: "M10 9h4" }]
    ]
  ];

  const CigaretteOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
      ["path", { d: "M12 12H2v4h14" }],
      ["path", { d: "M22 12v4" }],
      ["path", { d: "M18 12h-.5" }],
      ["path", { d: "M7 12v4" }],
      ["path", { d: "M18 8c0-2.5-2-2.5-2-5" }],
      ["path", { d: "M22 8c0-2.5-2-2.5-2-5" }]
    ]
  ];

  const Cigarette = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 12H2v4h16" }],
      ["path", { d: "M22 12v4" }],
      ["path", { d: "M7 12v4" }],
      ["path", { d: "M18 8c0-2.5-2-2.5-2-5" }],
      ["path", { d: "M22 8c0-2.5-2-2.5-2-5" }]
    ]
  ];

  const CircleDashed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0" }],
      ["path", { d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" }],
      ["path", { d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8" }],
      ["path", { d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" }],
      ["path", { d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0" }],
      ["path", { d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" }],
      ["path", { d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8" }],
      ["path", { d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" }]
    ]
  ];

  const CircleDollarSign = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
      ["path", { d: "M12 18V6" }]
    ]
  ];

  const CircleDotDashed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0" }],
      ["path", { d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" }],
      ["path", { d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8" }],
      ["path", { d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" }],
      ["path", { d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0" }],
      ["path", { d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" }],
      ["path", { d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8" }],
      ["path", { d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" }],
      ["circle", { cx: "12", cy: "12", r: "1" }]
    ]
  ];

  const CircleDot = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["circle", { cx: "12", cy: "12", r: "1" }]
    ]
  ];

  const CircleEllipsis = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M17 12h.01" }],
      ["path", { d: "M12 12h.01" }],
      ["path", { d: "M7 12h.01" }]
    ]
  ];

  const CircleEqual = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 10h10" }],
      ["path", { d: "M7 14h10" }],
      ["circle", { cx: "12", cy: "12", r: "10" }]
    ]
  ];

  const CircleOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" }],
      ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92" }]
    ]
  ];

  const CircleSlash2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M22 2 2 22" }]
    ]
  ];

  const CircleSlash = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "9", x2: "15", y1: "15", y2: "9" }],
      ["circle", { cx: "12", cy: "12", r: "10" }]
    ]
  ];

  const Circle = [
    "svg",
    defaultAttributes,
    [["circle", { cx: "12", cy: "12", r: "10" }]]
  ];

  const CircuitBoard = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3" }],
      ["circle", { cx: "9", cy: "9", r: "2" }],
      ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4" }],
      ["circle", { cx: "15", cy: "15", r: "2" }]
    ]
  ];

  const Citrus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"
        }
      ],
      ["path", { d: "M19.65 15.66A8 8 0 0 1 8.35 4.34" }],
      ["path", { d: "m14 10-5.5 5.5" }],
      ["path", { d: "M14 17.85V10H6.15" }]
    ]
  ];

  const Clapperboard = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z" }],
      [
        "path",
        {
          d: "m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.32l.87 2.87L4 11.01Z"
        }
      ],
      ["path", { d: "m6.6 4.99 3.38 4.2" }],
      ["path", { d: "m11.86 3.38 3.38 4.2" }]
    ]
  ];

  const ClipboardCheck = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        {
          d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        }
      ],
      ["path", { d: "m9 14 2 2 4-4" }]
    ]
  ];

  const ClipboardCopy = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" }
      ],
      ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4" }],
      ["path", { d: "M21 14H11" }],
      ["path", { d: "m15 10-4 4 4 4" }]
    ]
  ];

  const ClipboardEdit = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        {
          d: "M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"
        }
      ],
      ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" }],
      ["path", { d: "M4 13.5V6a2 2 0 0 1 2-2h2" }]
    ]
  ];

  const ClipboardList = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        {
          d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        }
      ],
      ["path", { d: "M12 11h4" }],
      ["path", { d: "M12 16h4" }],
      ["path", { d: "M8 11h.01" }],
      ["path", { d: "M8 16h.01" }]
    ]
  ];

  const ClipboardPaste = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"
        }
      ],
      [
        "path",
        {
          d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"
        }
      ],
      ["path", { d: "m17 10 4 4-4 4" }]
    ]
  ];

  const ClipboardSignature = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" }
      ],
      ["path", { d: "M16 4h2a2 2 0 0 1 1.73 1" }],
      [
        "path",
        {
          d: "M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44Z"
        }
      ],
      ["path", { d: "M8 18h1" }]
    ]
  ];

  const ClipboardType = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        {
          d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        }
      ],
      ["path", { d: "M9 12v-1h6v1" }],
      ["path", { d: "M11 17h2" }],
      ["path", { d: "M12 11v6" }]
    ]
  ];

  const ClipboardX = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        {
          d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        }
      ],
      ["path", { d: "m15 11-6 6" }],
      ["path", { d: "m9 11 6 6" }]
    ]
  ];

  const Clipboard = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
      [
        "path",
        {
          d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        }
      ]
    ]
  ];

  const Clock1 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 14.5 8" }]
    ]
  ];

  const Clock10 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 8 10" }]
    ]
  ];

  const Clock11 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 9.5 8" }]
    ]
  ];

  const Clock12 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12" }]
    ]
  ];

  const Clock2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 16 10" }]
    ]
  ];

  const Clock3 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 16.5 12" }]
    ]
  ];

  const Clock4 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 16 14" }]
    ]
  ];

  const Clock5 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 14.5 16" }]
    ]
  ];

  const Clock6 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 12 16.5" }]
    ]
  ];

  const Clock7 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 9.5 16" }]
    ]
  ];

  const Clock8 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 8 14" }]
    ]
  ];

  const Clock9 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 7.5 12" }]
    ]
  ];

  const Clock = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 16 14" }]
    ]
  ];

  const CloudCog = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" }],
      ["circle", { cx: "12", cy: "17", r: "3" }],
      ["path", { d: "M12 13v1" }],
      ["path", { d: "M12 20v1" }],
      ["path", { d: "M16 17h-1" }],
      ["path", { d: "M9 17H8" }],
      ["path", { d: "m15 14-.88.88" }],
      ["path", { d: "M9.88 19.12 9 20" }],
      ["path", { d: "m15 20-.88-.88" }],
      ["path", { d: "M9.88 14.88 9 14" }]
    ]
  ];

  const CloudDrizzle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M8 19v1" }],
      ["path", { d: "M8 14v1" }],
      ["path", { d: "M16 19v1" }],
      ["path", { d: "M16 14v1" }],
      ["path", { d: "M12 21v1" }],
      ["path", { d: "M12 16v1" }]
    ]
  ];

  const CloudFog = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M16 17H7" }],
      ["path", { d: "M17 21H9" }]
    ]
  ];

  const CloudHail = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M16 14v2" }],
      ["path", { d: "M8 14v2" }],
      ["path", { d: "M16 20h.01" }],
      ["path", { d: "M8 20h.01" }],
      ["path", { d: "M12 16v2" }],
      ["path", { d: "M12 22h.01" }]
    ]
  ];

  const CloudLightning = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" }],
      ["path", { d: "m13 12-3 5h4l-3 5" }]
    ]
  ];

  const CloudMoonRain = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10.083 9A6.002 6.002 0 0 1 16 4a4.243 4.243 0 0 0 6 6c0 2.22-1.206 4.16-3 5.197"
        }
      ],
      ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" }],
      ["path", { d: "M11 20v2" }],
      ["path", { d: "M7 19v2" }]
    ]
  ];

  const CloudMoon = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z" }],
      [
        "path",
        { d: "M10.1 9A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.197" }
      ]
    ]
  ];

  const CloudOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193" }],
      [
        "path",
        {
          d: "M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"
        }
      ]
    ]
  ];

  const CloudRainWind = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "m9.2 22 3-7" }],
      ["path", { d: "m9 13-3 7" }],
      ["path", { d: "m17 13-3 7" }]
    ]
  ];

  const CloudRain = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M16 14v6" }],
      ["path", { d: "M8 14v6" }],
      ["path", { d: "M12 16v6" }]
    ]
  ];

  const CloudSnow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M8 15h.01" }],
      ["path", { d: "M8 19h.01" }],
      ["path", { d: "M12 17h.01" }],
      ["path", { d: "M12 21h.01" }],
      ["path", { d: "M16 15h.01" }],
      ["path", { d: "M16 19h.01" }]
    ]
  ];

  const CloudSunRain = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v2" }],
      ["path", { d: "m4.93 4.93 1.41 1.41" }],
      ["path", { d: "M20 12h2" }],
      ["path", { d: "m19.07 4.93-1.41 1.41" }],
      ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
      ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" }],
      ["path", { d: "M11 20v2" }],
      ["path", { d: "M7 19v2" }]
    ]
  ];

  const CloudSun = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v2" }],
      ["path", { d: "m4.93 4.93 1.41 1.41" }],
      ["path", { d: "M20 12h2" }],
      ["path", { d: "m19.07 4.93-1.41 1.41" }],
      ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
      ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" }]
    ]
  ];

  const Cloud = [
    "svg",
    defaultAttributes,
    [["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]]
  ];

  const Cloudy = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }],
      ["path", { d: "M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" }]
    ]
  ];

  const Clover = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M16.2 3.8a2.7 2.7 0 0 0-3.81 0l-.4.38-.4-.4a2.7 2.7 0 0 0-3.82 0C6.73 4.85 6.67 6.64 8 8l4 4 4-4c1.33-1.36 1.27-3.15.2-4.2z"
        }
      ],
      [
        "path",
        {
          d: "M8 8c-1.36-1.33-3.15-1.27-4.2-.2a2.7 2.7 0 0 0 0 3.81l.38.4-.4.4a2.7 2.7 0 0 0 0 3.82C4.85 17.27 6.64 17.33 8 16"
        }
      ],
      [
        "path",
        {
          d: "M16 16c1.36 1.33 3.15 1.27 4.2.2a2.7 2.7 0 0 0 0-3.81l-.38-.4.4-.4a2.7 2.7 0 0 0 0-3.82C19.15 6.73 17.36 6.67 16 8"
        }
      ],
      [
        "path",
        {
          d: "M7.8 20.2a2.7 2.7 0 0 0 3.81 0l.4-.38.4.4a2.7 2.7 0 0 0 3.82 0c1.06-1.06 1.12-2.85-.21-4.21l-4-4-4 4c-1.33 1.36-1.27 3.15-.2 4.2z"
        }
      ],
      ["path", { d: "m7 17-5 5" }]
    ]
  ];

  const Club = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z"
        }
      ],
      ["path", { d: "M12 17.66L12 22" }]
    ]
  ];

  const Code2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m18 16 4-4-4-4" }],
      ["path", { d: "m6 8-4 4 4 4" }],
      ["path", { d: "m14.5 4-5 16" }]
    ]
  ];

  const Code = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "16 18 22 12 16 6" }],
      ["polyline", { points: "8 6 2 12 8 18" }]
    ]
  ];

  const Codepen = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "15.5" }],
      ["polyline", { points: "22 8.5 12 15.5 2 8.5" }],
      ["polyline", { points: "2 15.5 12 8.5 22 15.5" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "8.5" }]
    ]
  ];

  const Codesandbox = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        }
      ],
      ["polyline", { points: "7.5 4.21 12 6.81 16.5 4.21" }],
      ["polyline", { points: "7.5 19.79 7.5 14.6 3 12" }],
      ["polyline", { points: "21 12 16.5 14.6 16.5 19.79" }],
      ["polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }],
      ["line", { x1: "12", x2: "12", y1: "22.08", y2: "12" }]
    ]
  ];

  const Coffee = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 8h1a4 4 0 1 1 0 8h-1" }],
      ["path", { d: "M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" }],
      ["line", { x1: "6", x2: "6", y1: "2", y2: "4" }],
      ["line", { x1: "10", x2: "10", y1: "2", y2: "4" }],
      ["line", { x1: "14", x2: "14", y1: "2", y2: "4" }]
    ]
  ];

  const Cog = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" }],
      ["path", { d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" }],
      ["path", { d: "M12 2v2" }],
      ["path", { d: "M12 22v-2" }],
      ["path", { d: "m17 20.66-1-1.73" }],
      ["path", { d: "M11 10.27 7 3.34" }],
      ["path", { d: "m20.66 17-1.73-1" }],
      ["path", { d: "m3.34 7 1.73 1" }],
      ["path", { d: "M14 12h8" }],
      ["path", { d: "M2 12h2" }],
      ["path", { d: "m20.66 7-1.73 1" }],
      ["path", { d: "m3.34 17 1.73-1" }],
      ["path", { d: "m17 3.34-1 1.73" }],
      ["path", { d: "m11 13.73-4 6.93" }]
    ]
  ];

  const Coins = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "8", cy: "8", r: "6" }],
      ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18" }],
      ["path", { d: "M7 6h1v4" }],
      ["path", { d: "m16.71 13.88.7.71-2.82 2.82" }]
    ]
  ];

  const Columns = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "12", x2: "12", y1: "3", y2: "21" }]
    ]
  ];

  const Combine = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "8", x: "2", y: "2", rx: "2" }],
      ["path", { d: "M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" }],
      ["path", { d: "M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" }],
      ["path", { d: "M10 18H5c-1.7 0-3-1.3-3-3v-1" }],
      ["polyline", { points: "7 21 10 18 7 15" }],
      ["rect", { width: "8", height: "8", x: "14", y: "14", rx: "2" }]
    ]
  ];

  const Command = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
        }
      ]
    ]
  ];

  const Compass = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      [
        "polygon",
        { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" }
      ]
    ]
  ];

  const Component = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" }],
      ["path", { d: "m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" }],
      ["path", { d: "M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" }],
      ["path", { d: "m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" }]
    ]
  ];

  const Computer = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "8", x: "5", y: "2", rx: "2" }],
      ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
      ["path", { d: "M6 18h2" }],
      ["path", { d: "M12 18h6" }]
    ]
  ];

  const ConciergeBell = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 18a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2v-2Z" }],
      ["path", { d: "M20 16a8 8 0 1 0-16 0" }],
      ["path", { d: "M12 4v4" }],
      ["path", { d: "M10 4h4" }]
    ]
  ];

  const Construction = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1" }],
      ["path", { d: "M17 14v7" }],
      ["path", { d: "M7 14v7" }],
      ["path", { d: "M17 3v3" }],
      ["path", { d: "M7 3v3" }],
      ["path", { d: "M10 14 2.3 6.3" }],
      ["path", { d: "m14 6 7.7 7.7" }],
      ["path", { d: "m8 6 8 8" }]
    ]
  ];

  const Contact2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 18a4 4 0 0 0-8 0" }],
      ["circle", { cx: "12", cy: "11", r: "3" }],
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "4" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "4" }]
    ]
  ];

  const Contact = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" }],
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
      ["circle", { cx: "12", cy: "10", r: "2" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "4" }],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "4" }]
    ]
  ];

  const Container = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"
        }
      ],
      ["path", { d: "M10 21.9V14L2.1 9.1" }],
      ["path", { d: "m10 14 11.9-6.9" }],
      ["path", { d: "M14 19.8v-8.1" }],
      ["path", { d: "M18 17.5V9.4" }]
    ]
  ];

  const Contrast = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 18a6 6 0 0 0 0-12v12z" }]
    ]
  ];

  const Cookie = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }],
      ["path", { d: "M8.5 8.5v.01" }],
      ["path", { d: "M16 15.5v.01" }],
      ["path", { d: "M12 12v.01" }],
      ["path", { d: "M11 17v.01" }],
      ["path", { d: "M7 14v.01" }]
    ]
  ];

  const CopyCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m12 15 2 2 4-4" }],
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
    ]
  ];

  const CopyMinus = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "18", y1: "15", y2: "15" }],
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
    ]
  ];

  const CopyPlus = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "15", x2: "15", y1: "12", y2: "18" }],
      ["line", { x1: "12", x2: "18", y1: "15", y2: "15" }],
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
    ]
  ];

  const CopySlash = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "18", y1: "18", y2: "12" }],
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
    ]
  ];

  const CopyX = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "18", y1: "12", y2: "18" }],
      ["line", { x1: "12", x2: "18", y1: "18", y2: "12" }],
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
    ]
  ];

  const Copy = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
      ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
    ]
  ];

  const Copyleft = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M9 9.35a4 4 0 1 1 0 5.3" }]
    ]
  ];

  const Copyright = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M15 9.354a4 4 0 1 0 0 5.292" }]
    ]
  ];

  const CornerDownLeft = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "9 10 4 15 9 20" }],
      ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4" }]
    ]
  ];

  const CornerDownRight = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "15 10 20 15 15 20" }],
      ["path", { d: "M4 4v7a4 4 0 0 0 4 4h12" }]
    ]
  ];

  const CornerLeftDown = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "14 15 9 20 4 15" }],
      ["path", { d: "M20 4h-7a4 4 0 0 0-4 4v12" }]
    ]
  ];

  const CornerLeftUp = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "14 9 9 4 4 9" }],
      ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4" }]
    ]
  ];

  const CornerRightDown = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "10 15 15 20 20 15" }],
      ["path", { d: "M4 4h7a4 4 0 0 1 4 4v12" }]
    ]
  ];

  const CornerRightUp = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "10 9 15 4 20 9" }],
      ["path", { d: "M4 20h7a4 4 0 0 0 4-4V4" }]
    ]
  ];

  const CornerUpLeft = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "9 14 4 9 9 4" }],
      ["path", { d: "M20 20v-7a4 4 0 0 0-4-4H4" }]
    ]
  ];

  const CornerUpRight = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "15 14 20 9 15 4" }],
      ["path", { d: "M4 20v-7a4 4 0 0 1 4-4h12" }]
    ]
  ];

  const Cpu = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }],
      ["rect", { x: "9", y: "9", width: "6", height: "6" }],
      ["path", { d: "M15 2v2" }],
      ["path", { d: "M15 20v2" }],
      ["path", { d: "M2 15h2" }],
      ["path", { d: "M2 9h2" }],
      ["path", { d: "M20 15h2" }],
      ["path", { d: "M20 9h2" }],
      ["path", { d: "M9 2v2" }],
      ["path", { d: "M9 20v2" }]
    ]
  ];

  const CreativeCommons = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      [
        "path",
        {
          d: "M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"
        }
      ],
      [
        "path",
        {
          d: "M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"
        }
      ]
    ]
  ];

  const CreditCard = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2" }],
      ["line", { x1: "2", x2: "22", y1: "10", y2: "10" }]
    ]
  ];

  const Croissant = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"
        }
      ],
      [
        "path",
        {
          d: "m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"
        }
      ],
      ["path", { d: "M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4" }],
      [
        "path",
        {
          d: "m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"
        }
      ],
      ["path", { d: "M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5" }]
    ]
  ];

  const Crop = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14" }],
      ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2" }]
    ]
  ];

  const Cross = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"
        }
      ]
    ]
  ];

  const Crosshair = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "22", x2: "18", y1: "12", y2: "12" }],
      ["line", { x1: "6", x2: "2", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "6", y2: "2" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "18" }]
    ]
  ];

  const Crown = [
    "svg",
    defaultAttributes,
    [["path", { d: "m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" }]]
  ];

  const CupSoda = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" }
      ],
      ["path", { d: "M5 8h14" }],
      ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }],
      ["path", { d: "m12 8 1-6h2" }]
    ]
  ];

  const Currency = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "8" }],
      ["line", { x1: "3", x2: "6", y1: "3", y2: "6" }],
      ["line", { x1: "21", x2: "18", y1: "3", y2: "6" }],
      ["line", { x1: "3", x2: "6", y1: "21", y2: "18" }],
      ["line", { x1: "21", x2: "18", y1: "21", y2: "18" }]
    ]
  ];

  const DatabaseBackup = [
    "svg",
    defaultAttributes,
    [
      ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
      ["path", { d: "M3 5v14c0 1.4 3 2.7 7 3" }],
      ["path", { d: "M3 12c0 1.2 2 2.5 5 3" }],
      ["path", { d: "M21 5v4" }],
      [
        "path",
        {
          d: "M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"
        }
      ],
      ["path", { d: "M12 12v4h4" }]
    ]
  ];

  const Database = [
    "svg",
    defaultAttributes,
    [
      ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
      ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }],
      ["path", { d: "M3 12A9 3 0 0 0 21 12" }]
    ]
  ];

  const Delete = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" }],
      ["line", { x1: "18", x2: "12", y1: "9", y2: "15" }],
      ["line", { x1: "12", x2: "18", y1: "9", y2: "15" }]
    ]
  ];

  const Dessert = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "4", r: "2" }],
      [
        "path",
        {
          d: "M10.2 3.2C5.5 4 2 8.1 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0c0-4.9-3.5-9-8.2-9.8"
        }
      ],
      ["path", { d: "M3.2 14.8a9 9 0 0 0 17.6 0" }]
    ]
  ];

  const Diamond = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"
        }
      ]
    ]
  ];

  const Dice1 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M12 12h.01" }]
    ]
  ];

  const Dice2 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M15 9h.01" }],
      ["path", { d: "M9 15h.01" }]
    ]
  ];

  const Dice3 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M16 8h.01" }],
      ["path", { d: "M12 12h.01" }],
      ["path", { d: "M8 16h.01" }]
    ]
  ];

  const Dice4 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M16 8h.01" }],
      ["path", { d: "M8 8h.01" }],
      ["path", { d: "M8 16h.01" }],
      ["path", { d: "M16 16h.01" }]
    ]
  ];

  const Dice5 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M16 8h.01" }],
      ["path", { d: "M8 8h.01" }],
      ["path", { d: "M8 16h.01" }],
      ["path", { d: "M16 16h.01" }],
      ["path", { d: "M12 12h.01" }]
    ]
  ];

  const Dice6 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M16 8h.01" }],
      ["path", { d: "M16 12h.01" }],
      ["path", { d: "M16 16h.01" }],
      ["path", { d: "M8 8h.01" }],
      ["path", { d: "M8 12h.01" }],
      ["path", { d: "M8 16h.01" }]
    ]
  ];

  const Dices = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2" }],
      [
        "path",
        {
          d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"
        }
      ],
      ["path", { d: "M6 18h.01" }],
      ["path", { d: "M10 14h.01" }],
      ["path", { d: "M15 6h.01" }],
      ["path", { d: "M18 9h.01" }]
    ]
  ];

  const Diff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 3v14" }],
      ["path", { d: "M5 10h14" }],
      ["path", { d: "M5 21h14" }]
    ]
  ];

  const Disc2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M12 12h.01" }]
    ]
  ];

  const Disc3 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M6 12c0-1.7.7-3.2 1.8-4.2" }],
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "M18 12c0 1.7-.7 3.2-1.8 4.2" }]
    ]
  ];

  const Disc = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["circle", { cx: "12", cy: "12", r: "2" }]
    ]
  ];

  const DivideCircle = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "16", y2: "16" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "8" }],
      ["circle", { cx: "12", cy: "12", r: "10" }]
    ]
  ];

  const DivideSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "16", y2: "16" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "8" }]
    ]
  ];

  const Divide = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "6", r: "1" }],
      ["line", { x1: "5", x2: "19", y1: "12", y2: "12" }],
      ["circle", { cx: "12", cy: "18", r: "1" }]
    ]
  ];

  const DnaOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M15 2c-1.35 1.5-2.092 3-2.5 4.5M9 22c1.35-1.5 2.092-3 2.5-4.5" }
      ],
      [
        "path",
        { d: "M2 15c3.333-3 6.667-3 10-3m10-3c-1.5 1.35-3 2.092-4.5 2.5" }
      ],
      ["path", { d: "m17 6-2.5-2.5" }],
      ["path", { d: "m14 8-1.5-1.5" }],
      ["path", { d: "m7 18 2.5 2.5" }],
      ["path", { d: "m3.5 14.5.5.5" }],
      ["path", { d: "m20 9 .5.5" }],
      ["path", { d: "m6.5 12.5 1 1" }],
      ["path", { d: "m16.5 10.5 1 1" }],
      ["path", { d: "m10 16 1.5 1.5" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Dna = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 15c6.667-6 13.333 0 20-6" }],
      ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993" }],
      ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" }],
      ["path", { d: "m17 6-2.5-2.5" }],
      ["path", { d: "m14 8-1-1" }],
      ["path", { d: "m7 18 2.5 2.5" }],
      ["path", { d: "m3.5 14.5.5.5" }],
      ["path", { d: "m20 9 .5.5" }],
      ["path", { d: "m6.5 12.5 1 1" }],
      ["path", { d: "m16.5 10.5 1 1" }],
      ["path", { d: "m10 16 1.5 1.5" }]
    ]
  ];

  const Dog = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"
        }
      ],
      [
        "path",
        {
          d: "M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"
        }
      ],
      ["path", { d: "M8 14v.5" }],
      ["path", { d: "M16 14v.5" }],
      ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z" }],
      [
        "path",
        {
          d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"
        }
      ]
    ]
  ];

  const DollarSign = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }],
      ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" }]
    ]
  ];

  const Donut = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"
        }
      ],
      ["circle", { cx: "12", cy: "12", r: "3" }]
    ]
  ];

  const DoorClosed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" }],
      ["path", { d: "M2 20h20" }],
      ["path", { d: "M14 12v.01" }]
    ]
  ];

  const DoorOpen = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13 4h3a2 2 0 0 1 2 2v14" }],
      ["path", { d: "M2 20h3" }],
      ["path", { d: "M13 20h9" }],
      ["path", { d: "M10 12v.01" }],
      [
        "path",
        {
          d: "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"
        }
      ]
    ]
  ];

  const Dot = [
    "svg",
    defaultAttributes,
    [["circle", { cx: "12.1", cy: "12.1", r: "1" }]]
  ];

  const DownloadCloud = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M12 12v9" }],
      ["path", { d: "m8 17 4 4 4-4" }]
    ]
  ];

  const Download = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
      ["polyline", { points: "7 10 12 15 17 10" }],
      ["line", { x1: "12", x2: "12", y1: "15", y2: "3" }]
    ]
  ];

  const Dribbble = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" }],
      ["path", { d: "M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" }],
      ["path", { d: "M8.56 2.75c4.37 6 6 9.42 8 17.72" }]
    ]
  ];

  const Droplet = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
        }
      ]
    ]
  ];

  const Droplets = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
        }
      ],
      [
        "path",
        {
          d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"
        }
      ]
    ]
  ];

  const Drumstick = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15.45 15.4c-2.13.65-4.3.32-5.7-1.1-2.29-2.27-1.76-6.5 1.17-9.42 2.93-2.93 7.15-3.46 9.43-1.18 1.41 1.41 1.74 3.57 1.1 5.71-1.4-.51-3.26-.02-4.64 1.36-1.38 1.38-1.87 3.23-1.36 4.63z"
        }
      ],
      [
        "path",
        {
          d: "m11.25 15.6-2.16 2.16a2.5 2.5 0 1 1-4.56 1.73 2.49 2.49 0 0 1-1.41-4.24 2.5 2.5 0 0 1 3.14-.32l2.16-2.16"
        }
      ]
    ]
  ];

  const Dumbbell = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m6.5 6.5 11 11" }],
      ["path", { d: "m21 21-1-1" }],
      ["path", { d: "m3 3 1 1" }],
      ["path", { d: "m18 22 4-4" }],
      ["path", { d: "m2 6 4-4" }],
      ["path", { d: "m3 10 7-7" }],
      ["path", { d: "m14 21 7-7" }]
    ]
  ];

  const EarOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46" }],
      ["path", { d: "M6 8.5c0-.75.13-1.47.36-2.14" }],
      ["path", { d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76" }],
      ["path", { d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Ear = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" }],
      ["path", { d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" }]
    ]
  ];

  const EggFried = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11.5", cy: "12.5", r: "3.5" }],
      [
        "path",
        {
          d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"
        }
      ]
    ]
  ];

  const EggOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6.399 6.399C5.362 8.157 4.65 10.189 4.5 12c-.37 4.43 1.27 9.95 7.5 10 3.256-.026 5.259-1.547 6.375-3.625"
        }
      ],
      [
        "path",
        {
          d: "M19.532 13.875A14.07 14.07 0 0 0 19.5 12c-.36-4.34-3.95-9.96-7.5-10-1.04.012-2.082.502-3.046 1.297"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Egg = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"
        }
      ]
    ]
  ];

  const EqualNot = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "5", x2: "19", y1: "9", y2: "9" }],
      ["line", { x1: "5", x2: "19", y1: "15", y2: "15" }],
      ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }]
    ]
  ];

  const Equal = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "5", x2: "19", y1: "9", y2: "9" }],
      ["line", { x1: "5", x2: "19", y1: "15", y2: "15" }]
    ]
  ];

  const Eraser = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"
        }
      ],
      ["path", { d: "M22 21H7" }],
      ["path", { d: "m5 11 9 9" }]
    ]
  ];

  const Euro = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 10h12" }],
      ["path", { d: "M4 14h9" }],
      [
        "path",
        {
          d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"
        }
      ]
    ]
  ];

  const Expand = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m21 21-6-6m6 6v-4.8m0 4.8h-4.8" }],
      ["path", { d: "M3 16.2V21m0 0h4.8M3 21l6-6" }],
      ["path", { d: "M21 7.8V3m0 0h-4.8M21 3l-6 6" }],
      ["path", { d: "M3 7.8V3m0 0h4.8M3 3l6 6" }]
    ]
  ];

  const ExternalLink = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }],
      ["polyline", { points: "15 3 21 3 21 9" }],
      ["line", { x1: "10", x2: "21", y1: "14", y2: "3" }]
    ]
  ];

  const EyeOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }],
      [
        "path",
        {
          d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
        }
      ],
      [
        "path",
        {
          d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Eye = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }],
      ["circle", { cx: "12", cy: "12", r: "3" }]
    ]
  ];

  const Facebook = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        }
      ]
    ]
  ];

  const Factory = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
        }
      ],
      ["path", { d: "M17 18h1" }],
      ["path", { d: "M12 18h1" }],
      ["path", { d: "M7 18h1" }]
    ]
  ];

  const Fan = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"
        }
      ],
      ["path", { d: "M12 12v.01" }]
    ]
  ];

  const FastForward = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "13 19 22 12 13 5 13 19" }],
      ["polygon", { points: "2 19 11 12 2 5 2 19" }]
    ]
  ];

  const Feather = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" }],
      ["line", { x1: "16", x2: "2", y1: "8", y2: "22" }],
      ["line", { x1: "17.5", x2: "9", y1: "15", y2: "15" }]
    ]
  ];

  const FerrisWheel = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "M12 2v4" }],
      ["path", { d: "m6.8 15-3.5 2" }],
      ["path", { d: "m20.7 7-3.5 2" }],
      ["path", { d: "M6.8 9 3.3 7" }],
      ["path", { d: "m20.7 17-3.5-2" }],
      ["path", { d: "m9 22 3-8 3 8" }],
      ["path", { d: "M8 22h8" }],
      ["path", { d: "M18 18.7a9 9 0 1 0-12 0" }]
    ]
  ];

  const Figma = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" }],
      ["path", { d: "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" }],
      ["path", { d: "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" }],
      ["path", { d: "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" }],
      [
        "path",
        { d: "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" }
      ]
    ]
  ];

  const FileArchive = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8.5L20 7.5V20c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6h-2"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "10", cy: "20", r: "2" }],
      ["path", { d: "M10 7V6" }],
      ["path", { d: "M10 12v-1" }],
      ["path", { d: "M10 18v-2" }]
    ]
  ];

  const FileAudio2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v2" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M2 17v-3a4 4 0 0 1 8 0v3" }],
      ["circle", { cx: "9", cy: "17", r: "1" }],
      ["circle", { cx: "3", cy: "17", r: "1" }]
    ]
  ];

  const FileAudio = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0Z" }],
      ["path", { d: "M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0Z" }],
      ["path", { d: "M2 19v-3a6 6 0 0 1 12 0v3" }]
    ]
  ];

  const FileAxis3d = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M8 10v8h8" }],
      ["path", { d: "m8 18 4-4" }]
    ]
  ];

  const FileBadge2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["path", { d: "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" }],
      ["path", { d: "m14 12.5 1 5.5-3-1-3 1 1-5.5" }]
    ]
  ];

  const FileBadge = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-6" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" }],
      ["path", { d: "M7 16.5 8 22l-3-1-3 1 1-5.5" }]
    ]
  ];

  const FileBarChart2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M12 18v-6" }],
      ["path", { d: "M8 18v-1" }],
      ["path", { d: "M16 18v-3" }]
    ]
  ];

  const FileBarChart = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M12 18v-4" }],
      ["path", { d: "M8 18v-2" }],
      ["path", { d: "M16 18v-6" }]
    ]
  ];

  const FileBox = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      [
        "path",
        {
          d: "M2.97 13.12c-.6.36-.97 1.02-.97 1.74v3.28c0 .72.37 1.38.97 1.74l3 1.83c.63.39 1.43.39 2.06 0l3-1.83c.6-.36.97-1.02.97-1.74v-3.28c0-.72-.37-1.38-.97-1.74l-3-1.83a1.97 1.97 0 0 0-2.06 0l-3 1.83Z"
        }
      ],
      ["path", { d: "m7 17-4.74-2.85" }],
      ["path", { d: "m7 17 4.74-2.85" }],
      ["path", { d: "M7 17v5" }]
    ]
  ];

  const FileCheck2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m3 15 2 2 4-4" }]
    ]
  ];

  const FileCheck = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m9 15 2 2 4-4" }]
    ]
  ];

  const FileClock = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "8", cy: "16", r: "6" }],
      ["path", { d: "M9.5 17.5 8 16.25V14" }]
    ]
  ];

  const FileCode2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m9 18 3-3-3-3" }],
      ["path", { d: "m5 12-3 3 3 3" }]
    ]
  ];

  const FileCode = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m10 13-2 2 2 2" }],
      ["path", { d: "m14 17 2-2-2-2" }]
    ]
  ];

  const FileCog2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "12", cy: "15", r: "2" }],
      ["path", { d: "M12 12v1" }],
      ["path", { d: "M12 17v1" }],
      ["path", { d: "m14.6 13.5-.87.5" }],
      ["path", { d: "m10.27 16-.87.5" }],
      ["path", { d: "m14.6 16.5-.87-.5" }],
      ["path", { d: "m10.27 14-.87-.5" }]
    ]
  ];

  const FileCog = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "6", cy: "14", r: "3" }],
      ["path", { d: "M6 10v1" }],
      ["path", { d: "M6 17v1" }],
      ["path", { d: "M10 14H9" }],
      ["path", { d: "M3 14H2" }],
      ["path", { d: "m9 11-.88.88" }],
      ["path", { d: "M3.88 16.12 3 17" }],
      ["path", { d: "m9 17-.88-.88" }],
      ["path", { d: "M3.88 11.88 3 11" }]
    ]
  ];

  const FileDiff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["path", { d: "M12 13V7" }],
      ["path", { d: "M9 10h6" }],
      ["path", { d: "M9 17h6" }]
    ]
  ];

  const FileDigit = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "4", height: "6", x: "2", y: "12", rx: "2" }],
      ["path", { d: "M14 2v6h6" }],
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["path", { d: "M10 12h2v6" }],
      ["path", { d: "M10 18h4" }]
    ]
  ];

  const FileDown = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M12 18v-6" }],
      ["path", { d: "m9 15 3 3 3-3" }]
    ]
  ];

  const FileEdit = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      [
        "path",
        {
          d: "M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"
        }
      ]
    ]
  ];

  const FileHeart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      [
        "path",
        {
          d: "M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"
        }
      ]
    ]
  ];

  const FileImage = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "10", cy: "13", r: "2" }],
      ["path", { d: "m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" }]
    ]
  ];

  const FileInput = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M2 15h10" }],
      ["path", { d: "m9 18 3-3-3-3" }]
    ]
  ];

  const FileJson2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      [
        "path",
        {
          d: "M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"
        }
      ],
      [
        "path",
        {
          d: "M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"
        }
      ]
    ]
  ];

  const FileJson = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      [
        "path",
        {
          d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"
        }
      ],
      [
        "path",
        {
          d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"
        }
      ]
    ]
  ];

  const FileKey2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 10V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "4", cy: "16", r: "2" }],
      ["path", { d: "m10 10-4.5 4.5" }],
      ["path", { d: "m9 11 1 1" }]
    ]
  ];

  const FileKey = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["circle", { cx: "10", cy: "16", r: "2" }],
      ["path", { d: "m16 10-4.5 4.5" }],
      ["path", { d: "m15 11 1 1" }]
    ]
  ];

  const FileLineChart = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m16 13-3.5 3.5-2-2L8 17" }]
    ]
  ];

  const FileLock2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["rect", { width: "8", height: "5", x: "2", y: "13", rx: "1" }],
      ["path", { d: "M8 13v-2a2 2 0 1 0-4 0v2" }]
    ]
  ];

  const FileLock = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["rect", { width: "8", height: "6", x: "8", y: "12", rx: "1" }],
      ["path", { d: "M15 12v-2a3 3 0 1 0-6 0v2" }]
    ]
  ];

  const FileMinus2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M3 15h6" }]
    ]
  ];

  const FileMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["line", { x1: "9", x2: "15", y1: "15", y2: "15" }]
    ]
  ];

  const FileOutput = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M2 15h10" }],
      ["path", { d: "m5 12-3 3 3 3" }]
    ]
  ];

  const FilePieChart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 22h2a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M4.04 11.71a5.84 5.84 0 1 0 8.2 8.29" }],
      ["path", { d: "M13.83 16A5.83 5.83 0 0 0 8 10.17V16h5.83Z" }]
    ]
  ];

  const FilePlus2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M3 15h6" }],
      ["path", { d: "M6 12v6" }]
    ]
  ];

  const FilePlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["line", { x1: "12", x2: "12", y1: "18", y2: "12" }],
      ["line", { x1: "9", x2: "15", y1: "15", y2: "15" }]
    ]
  ];

  const FileQuestion = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      [
        "path",
        {
          d: "M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"
        }
      ],
      ["path", { d: "M12 17h.01" }]
    ]
  ];

  const FileScan = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 10V7.5L14.5 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h4.5" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M16 22a2 2 0 0 1-2-2" }],
      ["path", { d: "M20 22a2 2 0 0 0 2-2" }],
      ["path", { d: "M20 14a2 2 0 0 1 2 2" }],
      ["path", { d: "M16 14a2 2 0 0 0-2 2" }]
    ]
  ];

  const FileSearch2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["circle", { cx: "11.5", cy: "14.5", r: "2.5" }],
      ["path", { d: "M13.25 16.25 15 18" }]
    ]
  ];

  const FileSearch = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
      ["path", { d: "m9 18-1.5-1.5" }]
    ]
  ];

  const FileSignature = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L18 5.5"
        }
      ],
      ["path", { d: "M8 18h1" }],
      [
        "path",
        {
          d: "M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44Z"
        }
      ]
    ]
  ];

  const FileSpreadsheet = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M8 13h2" }],
      ["path", { d: "M8 17h2" }],
      ["path", { d: "M14 13h2" }],
      ["path", { d: "M14 17h2" }]
    ]
  ];

  const FileStack = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 2v5h5" }],
      [
        "path",
        {
          d: "M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z"
        }
      ],
      ["path", { d: "M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" }],
      ["path", { d: "M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" }]
    ]
  ];

  const FileSymlink = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v7" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m10 18 3-3-3-3" }],
      ["path", { d: "M4 18v-1a2 2 0 0 1 2-2h6" }]
    ]
  ];

  const FileTerminal = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m8 16 2-2-2-2" }],
      ["path", { d: "M12 18h4" }]
    ]
  ];

  const FileText = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["line", { x1: "16", x2: "8", y1: "13", y2: "13" }],
      ["line", { x1: "16", x2: "8", y1: "17", y2: "17" }],
      ["line", { x1: "10", x2: "8", y1: "9", y2: "9" }]
    ]
  ];

  const FileType2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M2 13v-1h6v1" }],
      ["path", { d: "M4 18h2" }],
      ["path", { d: "M5 12v6" }]
    ]
  ];

  const FileType = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M9 13v-1h6v1" }],
      ["path", { d: "M11 18h2" }],
      ["path", { d: "M12 12v6" }]
    ]
  ];

  const FileUp = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M12 12v6" }],
      ["path", { d: "m15 15-3-3-3 3" }]
    ]
  ];

  const FileVideo2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 8V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m10 15.5 4 2.5v-6l-4 2.5" }],
      ["rect", { width: "8", height: "6", x: "2", y: "12", rx: "1" }]
    ]
  ];

  const FileVideo = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m10 11 5 3-5 3v-6Z" }]
    ]
  ];

  const FileVolume2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "M11.5 13.5c.32.4.5.94.5 1.5s-.18 1.1-.5 1.5" }],
      ["path", { d: "M15 12c.64.8 1 1.87 1 3s-.36 2.2-1 3" }],
      ["path", { d: "M8 15h.01" }]
    ]
  ];

  const FileVolume = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" }],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["path", { d: "m7 10-3 2H2v4h2l3 2v-8Z" }],
      ["path", { d: "M11 11c.64.8 1 1.87 1 3s-.36 2.2-1 3" }]
    ]
  ];

  const FileWarning = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["path", { d: "M12 9v4" }],
      ["path", { d: "M12 17h.01" }]
    ]
  ];

  const FileX2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" }],
      ["path", { d: "M14 2v6h6" }],
      ["path", { d: "m3 12.5 5 5" }],
      ["path", { d: "m8 12.5-5 5" }]
    ]
  ];

  const FileX = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }],
      ["line", { x1: "9.5", x2: "14.5", y1: "12.5", y2: "17.5" }],
      ["line", { x1: "14.5", x2: "9.5", y1: "12.5", y2: "17.5" }]
    ]
  ];

  const File = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        }
      ],
      ["polyline", { points: "14 2 14 8 20 8" }]
    ]
  ];

  const Files = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"
        }
      ],
      ["path", { d: "M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" }],
      ["path", { d: "M15 2v5h5" }]
    ]
  ];

  const Film = [
    "svg",
    defaultAttributes,
    [
      [
        "rect",
        { width: "20", height: "20", x: "2", y: "2", rx: "2.18", ry: "2.18" }
      ],
      ["line", { x1: "7", x2: "7", y1: "2", y2: "22" }],
      ["line", { x1: "17", x2: "17", y1: "2", y2: "22" }],
      ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "2", x2: "7", y1: "7", y2: "7" }],
      ["line", { x1: "2", x2: "7", y1: "17", y2: "17" }],
      ["line", { x1: "17", x2: "22", y1: "17", y2: "17" }],
      ["line", { x1: "17", x2: "22", y1: "7", y2: "7" }]
    ]
  ];

  const FilterX = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055" }],
      ["path", { d: "m22 3-5 5" }],
      ["path", { d: "m17 3 5 5" }]
    ]
  ];

  const Filter = [
    "svg",
    defaultAttributes,
    [["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }]]
  ];

  const Fingerprint = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" }],
      ["path", { d: "M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" }],
      ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02" }],
      ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" }],
      ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2" }],
      ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88" }],
      ["path", { d: "M2 16h.01" }],
      ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6" }],
      ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" }]
    ]
  ];

  const FishOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"
        }
      ],
      [
        "path",
        {
          d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"
        }
      ],
      [
        "path",
        {
          d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"
        }
      ]
    ]
  ];

  const Fish = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"
        }
      ],
      ["path", { d: "M18 12v.5" }],
      ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86" }],
      [
        "path",
        {
          d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"
        }
      ],
      [
        "path",
        {
          d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"
        }
      ],
      [
        "path",
        {
          d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"
        }
      ]
    ]
  ];

  const FlagOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 2c3 0 5 2 8 2s4-1 4-1v11" }],
      ["path", { d: "M4 22V4" }],
      ["path", { d: "M4 15s1-1 4-1 5 2 8 2" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const FlagTriangleLeft = [
    "svg",
    defaultAttributes,
    [["path", { d: "M17 22V2L7 7l10 5" }]]
  ];

  const FlagTriangleRight = [
    "svg",
    defaultAttributes,
    [["path", { d: "M7 22V2l10 5-10 5" }]]
  ];

  const Flag = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }
      ],
      ["line", { x1: "4", x2: "4", y1: "22", y2: "15" }]
    ]
  ];

  const Flame = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        }
      ]
    ]
  ];

  const FlashlightOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4" }],
      ["path", { d: "M7 2h11v4c0 2-2 2-2 4v1" }],
      ["line", { x1: "11", x2: "18", y1: "6", y2: "6" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Flashlight = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"
        }
      ],
      ["line", { x1: "6", x2: "18", y1: "6", y2: "6" }],
      ["line", { x1: "12", x2: "12", y1: "12", y2: "12" }]
    ]
  ];

  const FlaskConicalOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 10 4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-1.272-2.542"
        }
      ],
      ["path", { d: "M10 2v2.343" }],
      ["path", { d: "M14 2v6.343" }],
      ["path", { d: "M8.5 2h7" }],
      ["path", { d: "M7 16h9" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const FlaskConical = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"
        }
      ],
      ["path", { d: "M8.5 2h7" }],
      ["path", { d: "M7 16h10" }]
    ]
  ];

  const FlaskRound = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 2v7.31" }],
      ["path", { d: "M14 9.3V1.99" }],
      ["path", { d: "M8.5 2h7" }],
      ["path", { d: "M14 9.3a6.5 6.5 0 1 1-4 0" }],
      ["path", { d: "M5.52 16h12.96" }]
    ]
  ];

  const FlipHorizontal2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 7 5 5-5 5V7" }],
      ["path", { d: "m21 7-5 5 5 5V7" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "M12 14v2" }],
      ["path", { d: "M12 8v2" }],
      ["path", { d: "M12 2v2" }]
    ]
  ];

  const FlipHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" }],
      ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "M12 14v2" }],
      ["path", { d: "M12 8v2" }],
      ["path", { d: "M12 2v2" }]
    ]
  ];

  const FlipVertical2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m17 3-5 5-5-5h10" }],
      ["path", { d: "m17 21-5-5-5 5h10" }],
      ["path", { d: "M4 12H2" }],
      ["path", { d: "M10 12H8" }],
      ["path", { d: "M16 12h-2" }],
      ["path", { d: "M22 12h-2" }]
    ]
  ];

  const FlipVertical = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" }],
      ["path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" }],
      ["path", { d: "M4 12H2" }],
      ["path", { d: "M10 12H8" }],
      ["path", { d: "M16 12h-2" }],
      ["path", { d: "M22 12h-2" }]
    ]
  ];

  const Flower2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"
        }
      ],
      ["circle", { cx: "12", cy: "8", r: "2" }],
      ["path", { d: "M12 10v12" }],
      ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" }],
      ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" }]
    ]
  ];

  const Flower = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"
        }
      ],
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["path", { d: "m8 16 1.5-1.5" }],
      ["path", { d: "M14.5 9.5 16 8" }],
      ["path", { d: "m8 8 1.5 1.5" }],
      ["path", { d: "M14.5 14.5 16 16" }]
    ]
  ];

  const Focus = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
      ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }]
    ]
  ];

  const FoldHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12h6" }],
      ["path", { d: "M22 12h-6" }],
      ["path", { d: "M12 2v2" }],
      ["path", { d: "M12 8v2" }],
      ["path", { d: "M12 14v2" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "m19 9-3 3 3 3" }],
      ["path", { d: "m5 15 3-3-3-3" }]
    ]
  ];

  const FoldVertical = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22v-6" }],
      ["path", { d: "M12 8V2" }],
      ["path", { d: "M4 12H2" }],
      ["path", { d: "M10 12H8" }],
      ["path", { d: "M16 12h-2" }],
      ["path", { d: "M22 12h-2" }],
      ["path", { d: "m15 19-3-3-3 3" }],
      ["path", { d: "m15 5-3 3-3-3" }]
    ]
  ];

  const FolderArchive = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 20V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2h6"
        }
      ],
      ["circle", { cx: "16", cy: "19", r: "2" }],
      ["path", { d: "M16 11v-1" }],
      ["path", { d: "M16 17v-2" }]
    ]
  ];

  const FolderCheck = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "m9 13 2 2 4-4" }]
    ]
  ];

  const FolderClock = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M7 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2"
        }
      ],
      ["circle", { cx: "16", cy: "16", r: "6" }],
      ["path", { d: "M16 14v2l1 1" }]
    ]
  ];

  const FolderClosed = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "M2 10h20" }]
    ]
  ];

  const FolderCog2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["circle", { cx: "12", cy: "13", r: "2" }],
      ["path", { d: "M12 10v1" }],
      ["path", { d: "M12 15v1" }],
      ["path", { d: "m14.6 11.5-.87.5" }],
      ["path", { d: "m10.27 14-.87.5" }],
      ["path", { d: "m14.6 14.5-.87-.5" }],
      ["path", { d: "m10.27 12-.87-.5" }]
    ]
  ];

  const FolderCog = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"
        }
      ],
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["path", { d: "M18 14v1" }],
      ["path", { d: "M18 21v1" }],
      ["path", { d: "M22 18h-1" }],
      ["path", { d: "M15 18h-1" }],
      ["path", { d: "m21 15-.88.88" }],
      ["path", { d: "M15.88 20.12 15 21" }],
      ["path", { d: "m21 21-.88-.88" }],
      ["path", { d: "M15.88 15.88 15 15" }]
    ]
  ];

  const FolderDot = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["circle", { cx: "12", cy: "13", r: "1" }]
    ]
  ];

  const FolderDown = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "M12 10v6" }],
      ["path", { d: "m15 13-3 3-3-3" }]
    ]
  ];

  const FolderEdit = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8.42 10.61a2.1 2.1 0 1 1 2.97 2.97L5.95 19 2 20l.99-3.95 5.43-5.44Z"
        }
      ],
      [
        "path",
        {
          d: "M2 11.5V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"
        }
      ]
    ]
  ];

  const FolderGit2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"
        }
      ],
      ["circle", { cx: "13", cy: "12", r: "2" }],
      ["path", { d: "M18 19c-2.8 0-5-2.2-5-5v8" }],
      ["circle", { cx: "20", cy: "19", r: "2" }]
    ]
  ];

  const FolderGit = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["circle", { cx: "12", cy: "13", r: "2" }],
      ["path", { d: "M14 13h3" }],
      ["path", { d: "M7 13h3" }]
    ]
  ];

  const FolderHeart = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M11 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v1.5"
        }
      ],
      [
        "path",
        {
          d: "M21.29 13.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 21l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"
        }
      ]
    ]
  ];

  const FolderInput = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"
        }
      ],
      ["path", { d: "M2 13h10" }],
      ["path", { d: "m9 16 3-3-3-3" }]
    ]
  ];

  const FolderKanban = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "M8 10v4" }],
      ["path", { d: "M12 10v2" }],
      ["path", { d: "M16 10v6" }]
    ]
  ];

  const FolderKey = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2"
        }
      ],
      ["circle", { cx: "16", cy: "20", r: "2" }],
      ["path", { d: "m22 14-4.5 4.5" }],
      ["path", { d: "m21 15 1 1" }]
    ]
  ];

  const FolderLock = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2.5"
        }
      ],
      ["rect", { width: "8", height: "5", x: "14", y: "17", rx: "1" }],
      ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2" }]
    ]
  ];

  const FolderMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["line", { x1: "9", x2: "15", y1: "13", y2: "13" }]
    ]
  ];

  const FolderOpenDot = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"
        }
      ],
      ["circle", { cx: "14", cy: "15", r: "1" }]
    ]
  ];

  const FolderOpen = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"
        }
      ]
    ]
  ];

  const FolderOutput = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 7.5V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2"
        }
      ],
      ["path", { d: "M2 13h10" }],
      ["path", { d: "m5 10-3 3 3 3" }]
    ]
  ];

  const FolderPlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["line", { x1: "12", x2: "12", y1: "10", y2: "16" }],
      ["line", { x1: "9", x2: "15", y1: "13", y2: "13" }]
    ]
  ];

  const FolderRoot = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["circle", { cx: "12", cy: "13", r: "2" }],
      ["path", { d: "M12 15v5" }]
    ]
  ];

  const FolderSearch2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["circle", { cx: "11.5", cy: "12.5", r: "2.5" }],
      ["path", { d: "M13.27 14.27 15 16" }]
    ]
  ];

  const FolderSearch = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M11 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v4"
        }
      ],
      ["circle", { cx: "17", cy: "17", r: "3" }],
      ["path", { d: "m21 21-1.5-1.5" }]
    ]
  ];

  const FolderSymlink = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2"
        }
      ],
      ["path", { d: "m8 16 3-3-3-3" }],
      ["path", { d: "M2 16v-1a2 2 0 0 1 2-2h6" }]
    ]
  ];

  const FolderSync = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1"
        }
      ],
      ["path", { d: "M12 10v4h4" }],
      [
        "path",
        {
          d: "m12 14 1.5-1.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5c.4.4.8 1 1 1.5"
        }
      ],
      ["path", { d: "M22 22v-4h-4" }],
      [
        "path",
        {
          d: "m22 18-1.5 1.5c-.9.9-2.1 1.5-3.5 1.5s-2.6-.6-3.5-1.5c-.4-.4-.8-1-1-1.5"
        }
      ]
    ]
  ];

  const FolderTree = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M13 10h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
        }
      ],
      [
        "path",
        {
          d: "M13 21h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.88a1 1 0 0 1-.9-.55l-.44-.9a1 1 0 0 0-.9-.55H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
        }
      ],
      ["path", { d: "M3 3v2c0 1.1.9 2 2 2h3" }],
      ["path", { d: "M3 3v13c0 1.1.9 2 2 2h3" }]
    ]
  ];

  const FolderUp = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "M12 10v6" }],
      ["path", { d: "m9 13 3-3 3 3" }]
    ]
  ];

  const FolderX = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "m9.5 10.5 5 5" }],
      ["path", { d: "m14.5 10.5-5 5" }]
    ]
  ];

  const Folder = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        }
      ]
    ]
  ];

  const Folders = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8 17h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.93a2 2 0 0 1-1.66-.9l-.82-1.2a2 2 0 0 0-1.66-.9H8a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2Z"
        }
      ],
      ["path", { d: "M2 8v11c0 1.1.9 2 2 2h14" }]
    ]
  ];

  const Footprints = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"
        }
      ],
      [
        "path",
        {
          d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"
        }
      ],
      ["path", { d: "M16 17h4" }],
      ["path", { d: "M4 13h4" }]
    ]
  ];

  const Forklift = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 12H5a2 2 0 0 0-2 2v5" }],
      ["circle", { cx: "13", cy: "19", r: "2" }],
      ["circle", { cx: "5", cy: "19", r: "2" }],
      ["path", { d: "M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5" }]
    ]
  ];

  const FormInput = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }],
      ["path", { d: "M12 12h.01" }],
      ["path", { d: "M17 12h.01" }],
      ["path", { d: "M7 12h.01" }]
    ]
  ];

  const Forward = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "15 17 20 12 15 7" }],
      ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12" }]
    ]
  ];

  const Frame = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "22", x2: "2", y1: "6", y2: "6" }],
      ["line", { x1: "22", x2: "2", y1: "18", y2: "18" }],
      ["line", { x1: "6", x2: "6", y1: "2", y2: "22" }],
      ["line", { x1: "18", x2: "18", y1: "2", y2: "22" }]
    ]
  ];

  const Framer = [
    "svg",
    defaultAttributes,
    [["path", { d: "M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7" }]]
  ];

  const Frown = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2" }],
      ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
      ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
    ]
  ];

  const Fuel = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "3", x2: "15", y1: "22", y2: "22" }],
      ["line", { x1: "4", x2: "14", y1: "9", y2: "9" }],
      ["path", { d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" }],
      [
        "path",
        {
          d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"
        }
      ]
    ]
  ];

  const FunctionSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" }],
      ["path", { d: "M9 11.2h5.7" }]
    ]
  ];

  const GalleryHorizontalEnd = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 7v10" }],
      ["path", { d: "M6 5v14" }],
      ["rect", { width: "12", height: "18", x: "10", y: "3", rx: "2" }]
    ]
  ];

  const GalleryHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 3v18" }],
      ["rect", { width: "12", height: "18", x: "6", y: "3", rx: "2" }],
      ["path", { d: "M22 3v18" }]
    ]
  ];

  const GalleryThumbnails = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "14", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M4 21h1" }],
      ["path", { d: "M9 21h1" }],
      ["path", { d: "M14 21h1" }],
      ["path", { d: "M19 21h1" }]
    ]
  ];

  const GalleryVerticalEnd = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 2h10" }],
      ["path", { d: "M5 6h14" }],
      ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2" }]
    ]
  ];

  const GalleryVertical = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 2h18" }],
      ["rect", { width: "18", height: "12", x: "3", y: "6", rx: "2" }],
      ["path", { d: "M3 22h18" }]
    ]
  ];

  const Gamepad2 = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "6", x2: "10", y1: "11", y2: "11" }],
      ["line", { x1: "8", x2: "8", y1: "9", y2: "13" }],
      ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12" }],
      ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10" }],
      [
        "path",
        {
          d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
        }
      ]
    ]
  ];

  const Gamepad = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "6", x2: "10", y1: "12", y2: "12" }],
      ["line", { x1: "8", x2: "8", y1: "10", y2: "14" }],
      ["line", { x1: "15", x2: "15.01", y1: "13", y2: "13" }],
      ["line", { x1: "18", x2: "18.01", y1: "11", y2: "11" }],
      ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
    ]
  ];

  const GanttChartSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M9 8h7" }],
      ["path", { d: "M8 12h6" }],
      ["path", { d: "M11 16h5" }]
    ]
  ];

  const GanttChart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 6h10" }],
      ["path", { d: "M6 12h9" }],
      ["path", { d: "M11 18h7" }]
    ]
  ];

  const GaugeCircle = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15.6 2.7a10 10 0 1 0 5.7 5.7" }],
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "M13.4 10.6 19 5" }]
    ]
  ];

  const Gauge = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m12 14 4-4" }],
      ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0" }]
    ]
  ];

  const Gavel = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"
        }
      ],
      ["path", { d: "m16 16 6-6" }],
      ["path", { d: "m8 8 6-6" }],
      ["path", { d: "m9 7 8 8" }],
      ["path", { d: "m21 11-8-8" }]
    ]
  ];

  const Gem = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 3h12l4 6-10 13L2 9Z" }],
      ["path", { d: "M11 3 8 9l4 13 4-13-3-6" }],
      ["path", { d: "M2 9h20" }]
    ]
  ];

  const Ghost = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 10h.01" }],
      ["path", { d: "M15 10h.01" }],
      [
        "path",
        {
          d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"
        }
      ]
    ]
  ];

  const Gift = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "20 12 20 22 4 22 4 12" }],
      ["rect", { width: "20", height: "5", x: "2", y: "7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "7" }],
      ["path", { d: "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" }],
      ["path", { d: "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" }]
    ]
  ];

  const GitBranchPlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 3v12" }],
      ["path", { d: "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
      ["path", { d: "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
      ["path", { d: "M15 6a9 9 0 0 0-9 9" }],
      ["path", { d: "M18 15v6" }],
      ["path", { d: "M21 18h-6" }]
    ]
  ];

  const GitBranch = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "6", x2: "6", y1: "3", y2: "15" }],
      ["circle", { cx: "18", cy: "6", r: "3" }],
      ["circle", { cx: "6", cy: "18", r: "3" }],
      ["path", { d: "M18 9a9 9 0 0 1-9 9" }]
    ]
  ];

  const GitCommit = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["line", { x1: "3", x2: "9", y1: "12", y2: "12" }],
      ["line", { x1: "15", x2: "21", y1: "12", y2: "12" }]
    ]
  ];

  const GitCompare = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
      ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9" }]
    ]
  ];

  const GitFork = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "18", r: "3" }],
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["circle", { cx: "18", cy: "6", r: "3" }],
      ["path", { d: "M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" }],
      ["path", { d: "M12 12v3" }]
    ]
  ];

  const GitMerge = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["path", { d: "M6 21V9a9 9 0 0 0 9 9" }]
    ]
  ];

  const GitPullRequestClosed = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["path", { d: "M18 11.5V15" }],
      ["path", { d: "m21 3-6 6" }],
      ["path", { d: "m21 9-6-6" }],
      ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
    ]
  ];

  const GitPullRequestDraft = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["path", { d: "M18 6V5" }],
      ["path", { d: "M18 11v-1" }],
      ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
    ]
  ];

  const GitPullRequest = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
      ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
    ]
  ];

  const Github = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        }
      ],
      ["path", { d: "M9 18c-4.51 2-5-2-7-2" }]
    ]
  ];

  const Gitlab = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"
        }
      ]
    ]
  ];

  const GlassWater = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"
        }
      ],
      ["path", { d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" }]
    ]
  ];

  const Glasses = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "6", cy: "15", r: "4" }],
      ["circle", { cx: "18", cy: "15", r: "4" }],
      ["path", { d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" }],
      ["path", { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2" }],
      ["path", { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2" }]
    ]
  ];

  const Globe2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" }],
      [
        "path",
        {
          d: "M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17"
        }
      ],
      [
        "path",
        { d: "M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }
      ],
      ["circle", { cx: "12", cy: "12", r: "10" }]
    ]
  ];

  const Globe = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
      [
        "path",
        {
          d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        }
      ]
    ]
  ];

  const Goal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 13V2l8 4-8 4" }],
      ["path", { d: "M20.55 10.23A9 9 0 1 1 8 4.94" }],
      ["path", { d: "M8 10a5 5 0 1 0 8.9 2.02" }]
    ]
  ];

  const Grab = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" }],
      ["path", { d: "M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" }],
      ["path", { d: "M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" }],
      ["path", { d: "M6 14v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" }],
      [
        "path",
        {
          d: "M18 11v0a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"
        }
      ]
    ]
  ];

  const GraduationCap = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 10v6M2 10l10-5 10 5-10 5z" }],
      ["path", { d: "M6 12v5c3 3 9 3 12 0v-5" }]
    ]
  ];

  const Grape = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 5V2l-5.89 5.89" }],
      ["circle", { cx: "16.6", cy: "15.89", r: "3" }],
      ["circle", { cx: "8.11", cy: "7.4", r: "3" }],
      ["circle", { cx: "12.35", cy: "11.65", r: "3" }],
      ["circle", { cx: "13.91", cy: "5.85", r: "3" }],
      ["circle", { cx: "18.15", cy: "10.09", r: "3" }],
      ["circle", { cx: "6.56", cy: "13.2", r: "3" }],
      ["circle", { cx: "10.8", cy: "17.44", r: "3" }],
      ["circle", { cx: "5", cy: "19", r: "3" }]
    ]
  ];

  const Grid = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
      ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }],
      ["line", { x1: "9", x2: "9", y1: "3", y2: "21" }],
      ["line", { x1: "15", x2: "15", y1: "3", y2: "21" }]
    ]
  ];

  const GripHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "9", r: "1" }],
      ["circle", { cx: "19", cy: "9", r: "1" }],
      ["circle", { cx: "5", cy: "9", r: "1" }],
      ["circle", { cx: "12", cy: "15", r: "1" }],
      ["circle", { cx: "19", cy: "15", r: "1" }],
      ["circle", { cx: "5", cy: "15", r: "1" }]
    ]
  ];

  const GripVertical = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "9", cy: "12", r: "1" }],
      ["circle", { cx: "9", cy: "5", r: "1" }],
      ["circle", { cx: "9", cy: "19", r: "1" }],
      ["circle", { cx: "15", cy: "12", r: "1" }],
      ["circle", { cx: "15", cy: "5", r: "1" }],
      ["circle", { cx: "15", cy: "19", r: "1" }]
    ]
  ];

  const Grip = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "5", r: "1" }],
      ["circle", { cx: "19", cy: "5", r: "1" }],
      ["circle", { cx: "5", cy: "5", r: "1" }],
      ["circle", { cx: "12", cy: "12", r: "1" }],
      ["circle", { cx: "19", cy: "12", r: "1" }],
      ["circle", { cx: "5", cy: "12", r: "1" }],
      ["circle", { cx: "12", cy: "19", r: "1" }],
      ["circle", { cx: "19", cy: "19", r: "1" }],
      ["circle", { cx: "5", cy: "19", r: "1" }]
    ]
  ];

  const Group = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 7V5c0-1.1.9-2 2-2h2" }],
      ["path", { d: "M17 3h2c1.1 0 2 .9 2 2v2" }],
      ["path", { d: "M21 17v2c0 1.1-.9 2-2 2h-2" }],
      ["path", { d: "M7 21H5c-1.1 0-2-.9-2-2v-2" }],
      ["rect", { width: "7", height: "5", x: "7", y: "7", rx: "1" }],
      ["rect", { width: "7", height: "5", x: "10", y: "12", rx: "1" }]
    ]
  ];

  const Hammer = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"
        }
      ],
      ["path", { d: "M17.64 15 22 10.64" }],
      [
        "path",
        {
          d: "m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"
        }
      ]
    ]
  ];

  const HandMetal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" }],
      ["path", { d: "M14 11V9a2 2 0 1 0-4 0v2" }],
      ["path", { d: "M10 10.5V5a2 2 0 1 0-4 0v9" }],
      [
        "path",
        {
          d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"
        }
      ]
    ]
  ];

  const Hand = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" }],
      ["path", { d: "M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" }],
      ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" }],
      [
        "path",
        {
          d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
        }
      ]
    ]
  ];

  const HardDriveDownload = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v8" }],
      ["path", { d: "m16 6-4 4-4-4" }],
      ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
      ["path", { d: "M6 18h.01" }],
      ["path", { d: "M10 18h.01" }]
    ]
  ];

  const HardDriveUpload = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m16 6-4-4-4 4" }],
      ["path", { d: "M12 2v8" }],
      ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
      ["path", { d: "M6 18h.01" }],
      ["path", { d: "M10 18h.01" }]
    ]
  ];

  const HardDrive = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "22", x2: "2", y1: "12", y2: "12" }],
      [
        "path",
        {
          d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
        }
      ],
      ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16" }],
      ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16" }]
    ]
  ];

  const HardHat = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"
        }
      ],
      ["path", { d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" }],
      ["path", { d: "M4 15v-3a6 6 0 0 1 6-6h0" }],
      ["path", { d: "M14 6h0a6 6 0 0 1 6 6v3" }]
    ]
  ];

  const Hash = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "4", x2: "20", y1: "9", y2: "9" }],
      ["line", { x1: "4", x2: "20", y1: "15", y2: "15" }],
      ["line", { x1: "10", x2: "8", y1: "3", y2: "21" }],
      ["line", { x1: "16", x2: "14", y1: "3", y2: "21" }]
    ]
  ];

  const Haze = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m5.2 6.2 1.4 1.4" }],
      ["path", { d: "M2 13h2" }],
      ["path", { d: "M20 13h2" }],
      ["path", { d: "m17.4 7.6 1.4-1.4" }],
      ["path", { d: "M22 17H2" }],
      ["path", { d: "M22 21H2" }],
      ["path", { d: "M16 13a4 4 0 0 0-8 0" }],
      ["path", { d: "M12 5V2.5" }]
    ]
  ];

  const HdmiPort = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z"
        }
      ],
      ["path", { d: "M7.5 12h9" }]
    ]
  ];

  const Heading1 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12h8" }],
      ["path", { d: "M4 18V6" }],
      ["path", { d: "M12 18V6" }],
      ["path", { d: "m17 12 3-2v8" }]
    ]
  ];

  const Heading2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12h8" }],
      ["path", { d: "M4 18V6" }],
      ["path", { d: "M12 18V6" }],
      ["path", { d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" }]
    ]
  ];

  const Heading3 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12h8" }],
      ["path", { d: "M4 18V6" }],
      ["path", { d: "M12 18V6" }],
      ["path", { d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" }],
      ["path", { d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" }]
    ]
  ];

  const Heading4 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12h8" }],
      ["path", { d: "M4 18V6" }],
      ["path", { d: "M12 18V6" }],
      ["path", { d: "M17 10v4h4" }],
      ["path", { d: "M21 10v8" }]
    ]
  ];

  const Heading5 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12h8" }],
      ["path", { d: "M4 18V6" }],
      ["path", { d: "M12 18V6" }],
      ["path", { d: "M17 13v-3h4" }],
      [
        "path",
        { d: "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" }
      ]
    ]
  ];

  const Heading6 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12h8" }],
      ["path", { d: "M4 18V6" }],
      ["path", { d: "M12 18V6" }],
      ["circle", { cx: "19", cy: "16", r: "2" }],
      ["path", { d: "M20 10c-2 2-3 3.5-3 6" }]
    ]
  ];

  const Heading = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 12h12" }],
      ["path", { d: "M6 20V4" }],
      ["path", { d: "M18 20V4" }]
    ]
  ];

  const Headphones = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
        }
      ]
    ]
  ];

  const HeartCrack = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        }
      ],
      ["path", { d: "m12 13-1-1 2-2-3-3 2-2" }]
    ]
  ];

  const HeartHandshake = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        }
      ],
      [
        "path",
        {
          d: "M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"
        }
      ],
      ["path", { d: "m18 15-2-2" }],
      ["path", { d: "m15 18-2-2" }]
    ]
  ];

  const HeartOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", y1: "2", x2: "22", y2: "22" }],
      [
        "path",
        {
          d: "M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"
        }
      ],
      [
        "path",
        {
          d: "M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"
        }
      ]
    ]
  ];

  const HeartPulse = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        }
      ],
      ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" }]
    ]
  ];

  const Heart = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        }
      ]
    ]
  ];

  const HelpCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
      ["path", { d: "M12 17h.01" }]
    ]
  ];

  const HelpingHand = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m3 15 5.12-5.12A3 3 0 0 1 10.24 9H13a2 2 0 1 1 0 4h-2.5m4-.68 4.17-4.89a1.88 1.88 0 0 1 2.92 2.36l-4.2 5.94A3 3 0 0 1 14.96 17H9.83a2 2 0 0 0-1.42.59L7 19"
        }
      ],
      ["path", { d: "m2 14 6 6" }]
    ]
  ];

  const Hexagon = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        }
      ]
    ]
  ];

  const Highlighter = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 11-6 6v3h9l3-3" }],
      [
        "path",
        { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" }
      ]
    ]
  ];

  const History = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
      ["path", { d: "M3 3v5h5" }],
      ["path", { d: "M12 7v5l4 2" }]
    ]
  ];

  const Home = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
      ["polyline", { points: "9 22 9 12 15 12 15 22" }]
    ]
  ];

  const HopOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M17.5 5.5C19 7 20.5 9 21 11c-1.323.265-2.646.39-4.118.226" }
      ],
      ["path", { d: "M5.5 17.5C7 19 9 20.5 11 21c.5-2.5.5-5-1-8.5" }],
      ["path", { d: "M17.5 17.5c-2.5 0-4 0-6-1" }],
      ["path", { d: "M20 11.5c1 1.5 2 3.5 2 4.5" }],
      ["path", { d: "M11.5 20c1.5 1 3.5 2 4.5 2 .5-1.5 0-3-.5-4.5" }],
      ["path", { d: "M22 22c-2 0-3.5-.5-5.5-1.5" }],
      [
        "path",
        {
          d: "M4.783 4.782C1.073 8.492 1 14.5 5 18c1-1 2-4.5 1.5-6.5 1.5 1 4 1 5.5.5M8.227 2.57C11.578 1.335 15.453 2.089 18 5c-.88.88-3.7 1.761-5.726 1.618"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Hop = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17.5 5.5C19 7 20.5 9 21 11c-2.5.5-5 .5-8.5-1" }],
      ["path", { d: "M5.5 17.5C7 19 9 20.5 11 21c.5-2.5.5-5-1-8.5" }],
      ["path", { d: "M16.5 11.5c1 2 1 3.5 1 6-2.5 0-4 0-6-1" }],
      ["path", { d: "M20 11.5c1 1.5 2 3.5 2 4.5-1.5.5-3 0-4.5-.5" }],
      ["path", { d: "M11.5 20c1.5 1 3.5 2 4.5 2 .5-1.5 0-3-.5-4.5" }],
      ["path", { d: "M20.5 16.5c1 2 1.5 3.5 1.5 5.5-2 0-3.5-.5-5.5-1.5" }],
      [
        "path",
        {
          d: "M4.783 4.782C8.493 1.072 14.5 1 18 5c-1 1-4.5 2-6.5 1.5 1 1.5 1 4 .5 5.5-1.5.5-4 .5-5.5-.5C7 13.5 6 17 5 18c-4-3.5-3.927-9.508-.217-13.218Z"
        }
      ],
      ["path", { d: "M4.5 4.5 3 3c-.184-.185-.184-.816 0-1" }]
    ]
  ];

  const Hotel = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"
        }
      ],
      ["path", { d: "m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" }],
      ["path", { d: "M8 7h.01" }],
      ["path", { d: "M16 7h.01" }],
      ["path", { d: "M12 7h.01" }],
      ["path", { d: "M12 11h.01" }],
      ["path", { d: "M16 11h.01" }],
      ["path", { d: "M8 11h.01" }],
      ["path", { d: "M10 22v-6.5m4 0V22" }]
    ]
  ];

  const Hourglass = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 22h14" }],
      ["path", { d: "M5 2h14" }],
      [
        "path",
        {
          d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"
        }
      ],
      [
        "path",
        {
          d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
        }
      ]
    ]
  ];

  const IceCream2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6Zm-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"
        }
      ],
      ["path", { d: "M12.14 11a3.5 3.5 0 1 1 6.71 0" }],
      ["path", { d: "M15.5 6.5a3.5 3.5 0 1 0-7 0" }]
    ]
  ];

  const IceCream = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" }],
      ["path", { d: "M17 7A5 5 0 0 0 7 7" }],
      ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4" }]
    ]
  ];

  const ImageMinus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }],
      ["line", { x1: "16", x2: "22", y1: "5", y2: "5" }],
      ["circle", { cx: "9", cy: "9", r: "2" }],
      ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
    ]
  ];

  const ImageOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
      ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83" }],
      ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21" }],
      ["line", { x1: "18", x2: "21", y1: "12", y2: "15" }],
      [
        "path",
        {
          d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"
        }
      ],
      ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9" }]
    ]
  ];

  const ImagePlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }],
      ["line", { x1: "16", x2: "22", y1: "5", y2: "5" }],
      ["line", { x1: "19", x2: "19", y1: "2", y2: "8" }],
      ["circle", { cx: "9", cy: "9", r: "2" }],
      ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
    ]
  ];

  const Image = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["circle", { cx: "9", cy: "9", r: "2" }],
      ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
    ]
  ];

  const Import = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 3v12" }],
      ["path", { d: "m8 11 4 4 4-4" }],
      [
        "path",
        {
          d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"
        }
      ]
    ]
  ];

  const Inbox = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }],
      [
        "path",
        {
          d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
        }
      ]
    ]
  ];

  const Indent = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "3 8 7 12 3 16" }],
      ["line", { x1: "21", x2: "11", y1: "12", y2: "12" }],
      ["line", { x1: "21", x2: "11", y1: "6", y2: "6" }],
      ["line", { x1: "21", x2: "11", y1: "18", y2: "18" }]
    ]
  ];

  const IndianRupee = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 3h12" }],
      ["path", { d: "M6 8h12" }],
      ["path", { d: "m6 13 8.5 8" }],
      ["path", { d: "M6 13h3" }],
      ["path", { d: "M9 13c6.667 0 6.667-10 0-10" }]
    ]
  ];

  const Infinity = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"
        }
      ]
    ]
  ];

  const Info = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 16v-4" }],
      ["path", { d: "M12 8h.01" }]
    ]
  ];

  const Inspect = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }
      ],
      ["path", { d: "m12 12 4 10 1.7-4.3L22 16Z" }]
    ]
  ];

  const Instagram = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }],
      ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }],
      ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" }]
    ]
  ];

  const Italic = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "19", x2: "10", y1: "4", y2: "4" }],
      ["line", { x1: "14", x2: "5", y1: "20", y2: "20" }],
      ["line", { x1: "15", x2: "9", y1: "4", y2: "20" }]
    ]
  ];

  const IterationCcw = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8" }],
      ["polyline", { points: "16 14 20 18 16 22" }]
    ]
  ];

  const IterationCw = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4" }],
      ["polyline", { points: "8 22 4 18 8 14" }]
    ]
  ];

  const JapaneseYen = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3" }],
      ["path", { d: "M6 15h12" }],
      ["path", { d: "M6 11h12" }]
    ]
  ];

  const Joystick = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z"
        }
      ],
      ["path", { d: "M6 15v-2" }],
      ["path", { d: "M12 15V9" }],
      ["circle", { cx: "12", cy: "6", r: "3" }]
    ]
  ];

  const KanbanSquareDashed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 7v7" }],
      ["path", { d: "M12 7v4" }],
      ["path", { d: "M16 7v9" }],
      ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
      ["path", { d: "M9 3h1" }],
      ["path", { d: "M14 3h1" }],
      ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
      ["path", { d: "M21 9v1" }],
      ["path", { d: "M21 14v1" }],
      ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
      ["path", { d: "M14 21h1" }],
      ["path", { d: "M9 21h1" }],
      ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
      ["path", { d: "M3 14v1" }],
      ["path", { d: "M3 9v1" }]
    ]
  ];

  const KanbanSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M8 7v7" }],
      ["path", { d: "M12 7v4" }],
      ["path", { d: "M16 7v9" }]
    ]
  ];

  const Kanban = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 5v11" }],
      ["path", { d: "M12 5v6" }],
      ["path", { d: "M18 5v14" }]
    ]
  ];

  const KeyRound = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" }
      ],
      ["circle", { cx: "16.5", cy: "7.5", r: ".5" }]
    ]
  ];

  const KeySquare = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12.4 2.7c.9-.9 2.5-.9 3.4 0l5.5 5.5c.9.9.9 2.5 0 3.4l-3.7 3.7c-.9.9-2.5.9-3.4 0L8.7 9.8c-.9-.9-.9-2.5 0-3.4Z"
        }
      ],
      ["path", { d: "m14 7 3 3" }],
      ["path", { d: "M9.4 10.6 2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4" }]
    ]
  ];

  const Key = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "7.5", cy: "15.5", r: "5.5" }],
      ["path", { d: "m21 2-9.6 9.6" }],
      ["path", { d: "m15.5 7.5 3 3L22 7l-3-3" }]
    ]
  ];

  const Keyboard = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", ry: "2" }],
      ["path", { d: "M6 8h.001" }],
      ["path", { d: "M10 8h.001" }],
      ["path", { d: "M14 8h.001" }],
      ["path", { d: "M18 8h.001" }],
      ["path", { d: "M8 12h.001" }],
      ["path", { d: "M12 12h.001" }],
      ["path", { d: "M16 12h.001" }],
      ["path", { d: "M7 16h10" }]
    ]
  ];

  const LampCeiling = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v5" }],
      ["path", { d: "M6 7h12l4 9H2l4-9Z" }],
      ["path", { d: "M9.17 16a3 3 0 1 0 5.66 0" }]
    ]
  ];

  const LampDesk = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m14 5-3 3 2 7 8-8-7-2Z" }],
      ["path", { d: "m14 5-3 3-3-3 3-3 3 3Z" }],
      ["path", { d: "M9.5 6.5 4 12l3 6" }],
      ["path", { d: "M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z" }]
    ]
  ];

  const LampFloor = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 2h6l3 7H6l3-7Z" }],
      ["path", { d: "M12 9v13" }],
      ["path", { d: "M9 22h6" }]
    ]
  ];

  const LampWallDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 13h6l3 7H8l3-7Z" }],
      ["path", { d: "M14 13V8a2 2 0 0 0-2-2H8" }],
      ["path", { d: "M4 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4v6Z" }]
    ]
  ];

  const LampWallUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 4h6l3 7H8l3-7Z" }],
      ["path", { d: "M14 11v5a2 2 0 0 1-2 2H8" }],
      ["path", { d: "M4 15h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6Z" }]
    ]
  ];

  const Lamp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 2h8l4 10H4L8 2Z" }],
      ["path", { d: "M12 12v6" }],
      ["path", { d: "M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z" }]
    ]
  ];

  const Landmark = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "3", x2: "21", y1: "22", y2: "22" }],
      ["line", { x1: "6", x2: "6", y1: "18", y2: "11" }],
      ["line", { x1: "10", x2: "10", y1: "18", y2: "11" }],
      ["line", { x1: "14", x2: "14", y1: "18", y2: "11" }],
      ["line", { x1: "18", x2: "18", y1: "18", y2: "11" }],
      ["polygon", { points: "12 2 20 7 4 7" }]
    ]
  ];

  const Languages = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m5 8 6 6" }],
      ["path", { d: "m4 14 6-6 2-3" }],
      ["path", { d: "M2 5h12" }],
      ["path", { d: "M7 2h1" }],
      ["path", { d: "m22 22-5-10-5 10" }],
      ["path", { d: "M14 18h6" }]
    ]
  ];

  const Laptop2 = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2" }],
      ["line", { x1: "2", x2: "22", y1: "20", y2: "20" }]
    ]
  ];

  const Laptop = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"
        }
      ]
    ]
  ];

  const LassoSelect = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 22a5 5 0 0 1-2-4" }],
      ["path", { d: "M7 16.93c.96.43 1.96.74 2.99.91" }],
      [
        "path",
        {
          d: "M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"
        }
      ],
      ["path", { d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }],
      [
        "path",
        {
          d: "M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14v0z"
        }
      ]
    ]
  ];

  const Lasso = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 22a5 5 0 0 1-2-4" }],
      [
        "path",
        {
          d: "M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8a12 12 0 0 1-5-1"
        }
      ],
      ["path", { d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }]
    ]
  ];

  const Laugh = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" }],
      ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
      ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
    ]
  ];

  const Layers = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "12 2 2 7 12 12 22 7 12 2" }],
      ["polyline", { points: "2 17 12 22 22 17" }],
      ["polyline", { points: "2 12 12 17 22 12" }]
    ]
  ];

  const LayoutDashboard = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1" }],
      ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1" }]
    ]
  ];

  const LayoutGrid = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }]
    ]
  ];

  const LayoutList = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
      ["path", { d: "M14 4h7" }],
      ["path", { d: "M14 9h7" }],
      ["path", { d: "M14 15h7" }],
      ["path", { d: "M14 20h7" }]
    ]
  ];

  const LayoutPanelLeft = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "7", height: "18", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }]
    ]
  ];

  const LayoutPanelTop = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
      ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }]
    ]
  ];

  const LayoutTemplate = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1" }],
      ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1" }]
    ]
  ];

  const Layout = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
      ["line", { x1: "9", x2: "9", y1: "21", y2: "9" }]
    ]
  ];

  const Leaf = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
        }
      ],
      ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" }]
    ]
  ];

  const LeafyGreen = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"
        }
      ],
      ["path", { d: "M2 22 17 7" }]
    ]
  ];

  const Library = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m16 6 4 14" }],
      ["path", { d: "M12 6v14" }],
      ["path", { d: "M8 8v12" }],
      ["path", { d: "M4 4v16" }]
    ]
  ];

  const LifeBuoy = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m4.93 4.93 4.24 4.24" }],
      ["path", { d: "m14.83 9.17 4.24-4.24" }],
      ["path", { d: "m14.83 14.83 4.24 4.24" }],
      ["path", { d: "m9.17 14.83-4.24 4.24" }],
      ["circle", { cx: "12", cy: "12", r: "4" }]
    ]
  ];

  const Ligature = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 20V8c0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2" }],
      ["path", { d: "M6 12h4" }],
      ["path", { d: "M14 12h2v8" }],
      ["path", { d: "M6 20h4" }],
      ["path", { d: "M14 20h4" }]
    ]
  ];

  const LightbulbOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" }],
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" }],
      ["path", { d: "M9 18h6" }],
      ["path", { d: "M10 22h4" }]
    ]
  ];

  const Lightbulb = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
        }
      ],
      ["path", { d: "M9 18h6" }],
      ["path", { d: "M10 22h4" }]
    ]
  ];

  const LineChart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3v18h18" }],
      ["path", { d: "m19 9-5 5-4-4-3 3" }]
    ]
  ];

  const Link2Off = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 17H7A5 5 0 0 1 7 7" }],
      ["path", { d: "M15 7h2a5 5 0 0 1 4 8" }],
      ["line", { x1: "8", x2: "12", y1: "12", y2: "12" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Link2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2" }],
      ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2" }],
      ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
    ]
  ];

  const Link = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }
      ],
      [
        "path",
        { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }
      ]
    ]
  ];

  const Linkedin = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        }
      ],
      ["rect", { width: "4", height: "12", x: "2", y: "9" }],
      ["circle", { cx: "4", cy: "4", r: "2" }]
    ]
  ];

  const ListChecks = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 17 2 2 4-4" }],
      ["path", { d: "m3 7 2 2 4-4" }],
      ["path", { d: "M13 6h8" }],
      ["path", { d: "M13 12h8" }],
      ["path", { d: "M13 18h8" }]
    ]
  ];

  const ListEnd = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 12H3" }],
      ["path", { d: "M16 6H3" }],
      ["path", { d: "M10 18H3" }],
      ["path", { d: "M21 6v10a2 2 0 0 1-2 2h-5" }],
      ["path", { d: "m16 16-2 2 2 2" }]
    ]
  ];

  const ListFilter = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M7 12h10" }],
      ["path", { d: "M10 18h4" }]
    ]
  ];

  const ListMinus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 12H3" }],
      ["path", { d: "M16 6H3" }],
      ["path", { d: "M16 18H3" }],
      ["path", { d: "M21 12h-6" }]
    ]
  ];

  const ListMusic = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 15V6" }],
      ["path", { d: "M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" }],
      ["path", { d: "M12 12H3" }],
      ["path", { d: "M16 6H3" }],
      ["path", { d: "M12 18H3" }]
    ]
  ];

  const ListOrdered = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "10", x2: "21", y1: "6", y2: "6" }],
      ["line", { x1: "10", x2: "21", y1: "12", y2: "12" }],
      ["line", { x1: "10", x2: "21", y1: "18", y2: "18" }],
      ["path", { d: "M4 6h1v4" }],
      ["path", { d: "M4 10h2" }],
      ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" }]
    ]
  ];

  const ListPlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 12H3" }],
      ["path", { d: "M16 6H3" }],
      ["path", { d: "M16 18H3" }],
      ["path", { d: "M18 9v6" }],
      ["path", { d: "M21 12h-6" }]
    ]
  ];

  const ListRestart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 6H3" }],
      ["path", { d: "M7 12H3" }],
      ["path", { d: "M7 18H3" }],
      [
        "path",
        {
          d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"
        }
      ],
      ["path", { d: "M11 10v4h4" }]
    ]
  ];

  const ListStart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 12H3" }],
      ["path", { d: "M16 18H3" }],
      ["path", { d: "M10 6H3" }],
      ["path", { d: "M21 18V8a2 2 0 0 0-2-2h-5" }],
      ["path", { d: "m16 8-2-2 2-2" }]
    ]
  ];

  const ListTodo = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "3", y: "5", width: "6", height: "6", rx: "1" }],
      ["path", { d: "m3 17 2 2 4-4" }],
      ["path", { d: "M13 6h8" }],
      ["path", { d: "M13 12h8" }],
      ["path", { d: "M13 18h8" }]
    ]
  ];

  const ListTree = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 12h-8" }],
      ["path", { d: "M21 6H8" }],
      ["path", { d: "M21 18h-8" }],
      ["path", { d: "M3 6v4c0 1.1.9 2 2 2h3" }],
      ["path", { d: "M3 10v6c0 1.1.9 2 2 2h3" }]
    ]
  ];

  const ListVideo = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 12H3" }],
      ["path", { d: "M16 6H3" }],
      ["path", { d: "M12 18H3" }],
      ["path", { d: "m16 12 5 3-5 3v-6Z" }]
    ]
  ];

  const ListX = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 12H3" }],
      ["path", { d: "M16 6H3" }],
      ["path", { d: "M16 18H3" }],
      ["path", { d: "m19 10-4 4" }],
      ["path", { d: "m15 10 4 4" }]
    ]
  ];

  const List = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "8", x2: "21", y1: "6", y2: "6" }],
      ["line", { x1: "8", x2: "21", y1: "12", y2: "12" }],
      ["line", { x1: "8", x2: "21", y1: "18", y2: "18" }],
      ["line", { x1: "3", x2: "3.01", y1: "6", y2: "6" }],
      ["line", { x1: "3", x2: "3.01", y1: "12", y2: "12" }],
      ["line", { x1: "3", x2: "3.01", y1: "18", y2: "18" }]
    ]
  ];

  const Loader2 = [
    "svg",
    defaultAttributes,
    [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]]
  ];

  const Loader = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "12", y1: "2", y2: "6" }],
      ["line", { x1: "12", x2: "12", y1: "18", y2: "22" }],
      ["line", { x1: "4.93", x2: "7.76", y1: "4.93", y2: "7.76" }],
      ["line", { x1: "16.24", x2: "19.07", y1: "16.24", y2: "19.07" }],
      ["line", { x1: "2", x2: "6", y1: "12", y2: "12" }],
      ["line", { x1: "18", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "4.93", x2: "7.76", y1: "19.07", y2: "16.24" }],
      ["line", { x1: "16.24", x2: "19.07", y1: "7.76", y2: "4.93" }]
    ]
  ];

  const LocateFixed = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
      ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
      ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
      ["circle", { cx: "12", cy: "12", r: "7" }],
      ["circle", { cx: "12", cy: "12", r: "3" }]
    ]
  ];

  const LocateOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
      ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
      ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
      [
        "path",
        {
          d: "M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11"
        }
      ],
      [
        "path",
        {
          d: "M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Locate = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
      ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
      ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
      ["circle", { cx: "12", cy: "12", r: "7" }]
    ]
  ];

  const Lock = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
      ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]
    ]
  ];

  const LogIn = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }],
      ["polyline", { points: "10 17 15 12 10 7" }],
      ["line", { x1: "15", x2: "3", y1: "12", y2: "12" }]
    ]
  ];

  const LogOut = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }],
      ["polyline", { points: "16 17 21 12 16 7" }],
      ["line", { x1: "21", x2: "9", y1: "12", y2: "12" }]
    ]
  ];

  const Lollipop = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }],
      ["path", { d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" }]
    ]
  ];

  const Luggage = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0"
        }
      ],
      ["path", { d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" }],
      ["path", { d: "M10 20h4" }],
      ["circle", { cx: "16", cy: "20", r: "2" }],
      ["circle", { cx: "8", cy: "20", r: "2" }]
    ]
  ];

  const Magnet = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"
        }
      ],
      ["path", { d: "m5 8 4 4" }],
      ["path", { d: "m12 15 4 4" }]
    ]
  ];

  const MailCheck = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      ["path", { d: "m16 19 2 2 4-4" }]
    ]
  ];

  const MailMinus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      ["path", { d: "M16 19h6" }]
    ]
  ];

  const MailOpen = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"
        }
      ],
      ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" }]
    ]
  ];

  const MailPlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      ["path", { d: "M19 16v6" }],
      ["path", { d: "M16 19h6" }]
    ]
  ];

  const MailQuestion = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      [
        "path",
        {
          d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"
        }
      ],
      ["path", { d: "M20 22v.01" }]
    ]
  ];

  const MailSearch = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      ["path", { d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z" }],
      ["circle", { cx: "18", cy: "18", r: "3" }],
      ["path", { d: "m22 22-1.5-1.5" }]
    ]
  ];

  const MailWarning = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      ["path", { d: "M20 14v4" }],
      ["path", { d: "M20 22v.01" }]
    ]
  ];

  const MailX = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" }
      ],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
      ["path", { d: "m17 17 4 4" }],
      ["path", { d: "m21 17-4 4" }]
    ]
  ];

  const Mail = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }]
    ]
  ];

  const Mailbox = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"
        }
      ],
      ["polyline", { points: "15,9 18,9 18,11" }],
      ["path", { d: "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" }],
      ["line", { x1: "6", x2: "7", y1: "10", y2: "10" }]
    ]
  ];

  const Mails = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "13", x: "6", y: "4", rx: "2" }],
      ["path", { d: "m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7" }],
      ["path", { d: "M2 8v11c0 1.1.9 2 2 2h14" }]
    ]
  ];

  const MapPinOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5.43 5.43A8.06 8.06 0 0 0 4 10c0 6 8 12 8 12a29.94 29.94 0 0 0 5-5"
        }
      ],
      [
        "path",
        {
          d: "M19.18 13.52A8.66 8.66 0 0 0 20 10a8 8 0 0 0-8-8 7.88 7.88 0 0 0-3.52.82"
        }
      ],
      [
        "path",
        {
          d: "M9.13 9.13A2.78 2.78 0 0 0 9 10a3 3 0 0 0 3 3 2.78 2.78 0 0 0 .87-.13"
        }
      ],
      ["path", { d: "M14.9 9.25a3 3 0 0 0-2.15-2.16" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const MapPin = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }],
      ["circle", { cx: "12", cy: "10", r: "3" }]
    ]
  ];

  const Map = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" }],
      ["line", { x1: "9", x2: "9", y1: "3", y2: "18" }],
      ["line", { x1: "15", x2: "15", y1: "6", y2: "21" }]
    ]
  ];

  const Martini = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 22h8" }],
      ["path", { d: "M12 11v11" }],
      ["path", { d: "m19 3-7 8-7-8Z" }]
    ]
  ];

  const Maximize2 = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "15 3 21 3 21 9" }],
      ["polyline", { points: "9 21 3 21 3 15" }],
      ["line", { x1: "21", x2: "14", y1: "3", y2: "10" }],
      ["line", { x1: "3", x2: "10", y1: "21", y2: "14" }]
    ]
  ];

  const Maximize = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }],
      ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }],
      ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }],
      ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }]
    ]
  ];

  const Medal = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"
        }
      ],
      ["path", { d: "M11 12 5.12 2.2" }],
      ["path", { d: "m13 12 5.88-9.8" }],
      ["path", { d: "M8 7h8" }],
      ["circle", { cx: "12", cy: "17", r: "5" }],
      ["path", { d: "M12 18v-2h-.5" }]
    ]
  ];

  const MegaphoneOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9.26 9.26 3 11v3l14.14 3.14" }],
      ["path", { d: "M21 15.34V6l-7.31 2.03" }],
      ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Megaphone = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 11 18-5v12L3 14v-3z" }],
      ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" }]
    ]
  ];

  const Meh = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "8", x2: "16", y1: "15", y2: "15" }],
      ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
      ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
    ]
  ];

  const MemoryStick = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 19v-3" }],
      ["path", { d: "M10 19v-3" }],
      ["path", { d: "M14 19v-3" }],
      ["path", { d: "M18 19v-3" }],
      ["path", { d: "M8 11V9" }],
      ["path", { d: "M16 11V9" }],
      ["path", { d: "M12 11V9" }],
      ["path", { d: "M2 15h20" }],
      [
        "path",
        {
          d: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"
        }
      ]
    ]
  ];

  const MenuSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M7 8h10" }],
      ["path", { d: "M7 12h10" }],
      ["path", { d: "M7 16h10" }]
    ]
  ];

  const Menu = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }],
      ["line", { x1: "4", x2: "20", y1: "6", y2: "6" }],
      ["line", { x1: "4", x2: "20", y1: "18", y2: "18" }]
    ]
  ];

  const Merge = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m8 6 4-4 4 4" }],
      ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" }],
      ["path", { d: "m20 22-5-5" }]
    ]
  ];

  const MessageCircle = [
    "svg",
    defaultAttributes,
    [["path", { d: "m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" }]]
  ];

  const MessageSquareDashed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 6V5c0-1.1.9-2 2-2h2" }],
      ["path", { d: "M11 3h3" }],
      ["path", { d: "M18 3h1c1.1 0 2 .9 2 2" }],
      ["path", { d: "M21 9v2" }],
      ["path", { d: "M21 15c0 1.1-.9 2-2 2h-1" }],
      ["path", { d: "M14 17h-3" }],
      ["path", { d: "m7 17-4 4v-5" }],
      ["path", { d: "M3 12v-2" }]
    ]
  ];

  const MessageSquarePlus = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }
      ],
      ["line", { x1: "9", x2: "15", y1: "10", y2: "10" }],
      ["line", { x1: "12", x2: "12", y1: "7", y2: "13" }]
    ]
  ];

  const MessageSquare = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }
      ]
    ]
  ];

  const MessagesSquare = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" }
      ],
      ["path", { d: "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" }]
    ]
  ];

  const Mic2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" }],
      ["circle", { cx: "17", cy: "7", r: "5" }]
    ]
  ];

  const MicOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
      ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }],
      ["path", { d: "M5 10v2a7 7 0 0 0 12 5" }],
      ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }],
      ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }],
      ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }]
    ]
  ];

  const Mic = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }],
      ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }],
      ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }]
    ]
  ];

  const Microscope = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 18h8" }],
      ["path", { d: "M3 22h18" }],
      ["path", { d: "M14 22a7 7 0 1 0 0-14h-1" }],
      ["path", { d: "M9 14h2" }],
      ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" }],
      ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" }]
    ]
  ];

  const Microwave = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "15", x: "2", y: "4", rx: "2" }],
      ["rect", { width: "8", height: "7", x: "6", y: "8", rx: "1" }],
      ["path", { d: "M18 8v7" }],
      ["path", { d: "M6 19v2" }],
      ["path", { d: "M18 19v2" }]
    ]
  ];

  const Milestone = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" }],
      ["path", { d: "M12 13v8" }],
      ["path", { d: "M12 3v3" }]
    ]
  ];

  const MilkOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 2h8" }],
      [
        "path",
        {
          d: "M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"
        }
      ],
      ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Milk = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 2h8" }],
      [
        "path",
        {
          d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"
        }
      ],
      ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }]
    ]
  ];

  const Minimize2 = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "4 14 10 14 10 20" }],
      ["polyline", { points: "20 10 14 10 14 4" }],
      ["line", { x1: "14", x2: "21", y1: "10", y2: "3" }],
      ["line", { x1: "3", x2: "10", y1: "21", y2: "14" }]
    ]
  ];

  const Minimize = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }],
      ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3" }],
      ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3" }],
      ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" }]
    ]
  ];

  const MinusCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M8 12h8" }]
    ]
  ];

  const MinusSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M8 12h8" }]
    ]
  ];

  const Minus = [
    "svg",
    defaultAttributes,
    [["path", { d: "M5 12h14" }]]
  ];

  const MonitorCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 10 2 2 4-4" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorDot = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "19", cy: "6", r: "3" }],
      ["path", { d: "M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 13V7" }],
      ["path", { d: "m15 10-3 3-3-3" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2" }],
      ["path", { d: "M22 15V5a2 2 0 0 0-2-2H9" }],
      ["path", { d: "M8 21h8" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "m2 2 20 20" }]
    ]
  ];

  const MonitorPause = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 13V7" }],
      ["path", { d: "M14 13V7" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorPlay = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m10 7 5 3-5 3Z" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorSmartphone = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" }],
      ["path", { d: "M10 19v-3.96 3.15" }],
      ["path", { d: "M7 19h5" }],
      ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2" }]
    ]
  ];

  const MonitorSpeaker = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5.5 20H8" }],
      ["path", { d: "M17 9h.01" }],
      ["rect", { width: "10", height: "16", x: "12", y: "4", rx: "2" }],
      ["path", { d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" }],
      ["circle", { cx: "17", cy: "15", r: "1" }]
    ]
  ];

  const MonitorStop = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "9", y: "7", width: "6", height: "6" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 10 3-3 3 3" }],
      ["path", { d: "M12 13V7" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const MonitorX = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m14.5 12.5-5-5" }],
      ["path", { d: "m9.5 12.5 5-5" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "M8 21h8" }]
    ]
  ];

  const Monitor = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
      ["line", { x1: "8", x2: "16", y1: "21", y2: "21" }],
      ["line", { x1: "12", x2: "12", y1: "17", y2: "21" }]
    ]
  ];

  const MoonStar = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }],
      ["path", { d: "M19 3v4" }],
      ["path", { d: "M21 5h-4" }]
    ]
  ];

  const Moon = [
    "svg",
    defaultAttributes,
    [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]
  ];

  const MoreHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "1" }],
      ["circle", { cx: "19", cy: "12", r: "1" }],
      ["circle", { cx: "5", cy: "12", r: "1" }]
    ]
  ];

  const MoreVertical = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "1" }],
      ["circle", { cx: "12", cy: "5", r: "1" }],
      ["circle", { cx: "12", cy: "19", r: "1" }]
    ]
  ];

  const MountainSnow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }],
      [
        "path",
        { d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" }
      ]
    ]
  ];

  const Mountain = [
    "svg",
    defaultAttributes,
    [["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }]]
  ];

  const MousePointer2 = [
    "svg",
    defaultAttributes,
    [["path", { d: "m4 4 7.07 17 2.51-7.39L21 11.07z" }]]
  ];

  const MousePointerClick = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 9 5 12 1.774-5.226L21 14 9 9z" }],
      ["path", { d: "m16.071 16.071 4.243 4.243" }],
      [
        "path",
        {
          d: "m7.188 2.239.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656-2.12 2.122"
        }
      ]
    ]
  ];

  const MousePointer = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" }],
      ["path", { d: "m13 13 6 6" }]
    ]
  ];

  const Mouse = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "5", y: "2", width: "14", height: "20", rx: "7" }],
      ["path", { d: "M12 6v4" }]
    ]
  ];

  const Move3d = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 3v16h16" }],
      ["path", { d: "m5 19 6-6" }],
      ["path", { d: "m2 6 3-3 3 3" }],
      ["path", { d: "m18 16 3 3-3 3" }]
    ]
  ];

  const MoveDiagonal2 = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "5 11 5 5 11 5" }],
      ["polyline", { points: "19 13 19 19 13 19" }],
      ["line", { x1: "5", x2: "19", y1: "5", y2: "19" }]
    ]
  ];

  const MoveDiagonal = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "13 5 19 5 19 11" }],
      ["polyline", { points: "11 19 5 19 5 13" }],
      ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }]
    ]
  ];

  const MoveDownLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 19H5V13" }],
      ["path", { d: "M19 5L5 19" }]
    ]
  ];

  const MoveDownRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 13V19H13" }],
      ["path", { d: "M5 5L19 19" }]
    ]
  ];

  const MoveDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 18L12 22L16 18" }],
      ["path", { d: "M12 2V22" }]
    ]
  ];

  const MoveHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "18 8 22 12 18 16" }],
      ["polyline", { points: "6 8 2 12 6 16" }],
      ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }]
    ]
  ];

  const MoveLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 8L2 12L6 16" }],
      ["path", { d: "M2 12H22" }]
    ]
  ];

  const MoveRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 8L22 12L18 16" }],
      ["path", { d: "M2 12H22" }]
    ]
  ];

  const MoveUpLeft = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 11V5H11" }],
      ["path", { d: "M5 5L19 19" }]
    ]
  ];

  const MoveUpRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13 5H19V11" }],
      ["path", { d: "M19 5L5 19" }]
    ]
  ];

  const MoveUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 6L12 2L16 6" }],
      ["path", { d: "M12 2V22" }]
    ]
  ];

  const MoveVertical = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "8 18 12 22 16 18" }],
      ["polyline", { points: "8 6 12 2 16 6" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }]
    ]
  ];

  const Move = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "5 9 2 12 5 15" }],
      ["polyline", { points: "9 5 12 2 15 5" }],
      ["polyline", { points: "15 19 12 22 9 19" }],
      ["polyline", { points: "19 9 22 12 19 15" }],
      ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }]
    ]
  ];

  const Music2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "8", cy: "18", r: "4" }],
      ["path", { d: "M12 18V2l7 4" }]
    ]
  ];

  const Music3 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "18", r: "4" }],
      ["path", { d: "M16 18V2" }]
    ]
  ];

  const Music4 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 18V5l12-2v13" }],
      ["path", { d: "m9 9 12-2" }],
      ["circle", { cx: "6", cy: "18", r: "3" }],
      ["circle", { cx: "18", cy: "16", r: "3" }]
    ]
  ];

  const Music = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 18V5l12-2v13" }],
      ["circle", { cx: "6", cy: "18", r: "3" }],
      ["circle", { cx: "18", cy: "16", r: "3" }]
    ]
  ];

  const Navigation2Off = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17" }],
      ["path", { d: "M14.53 8.88 12 2l-1.17 3.17" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Navigation2 = [
    "svg",
    defaultAttributes,
    [["polygon", { points: "12 2 19 21 12 17 5 21 12 2" }]]
  ];

  const NavigationOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43" }],
      ["path", { d: "M17.39 11.73 22 2l-9.73 4.61" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Navigation = [
    "svg",
    defaultAttributes,
    [["polygon", { points: "3 11 22 2 13 21 11 13 3 11" }]]
  ];

  const Network = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }],
      ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }],
      ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }],
      ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }],
      ["path", { d: "M12 12V8" }]
    ]
  ];

  const Newspaper = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
        }
      ],
      ["path", { d: "M18 14h-8" }],
      ["path", { d: "M15 18h-5" }],
      ["path", { d: "M10 6h8v4h-8V6Z" }]
    ]
  ];

  const Nfc = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 8.32a7.43 7.43 0 0 1 0 7.36" }],
      ["path", { d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58" }],
      ["path", { d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" }],
      ["path", { d: "M16.37 2a20.16 20.16 0 0 1 0 20" }]
    ]
  ];

  const NutOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 4V2" }],
      [
        "path",
        {
          d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"
        }
      ],
      ["path", { d: "M19 10v3.343" }],
      [
        "path",
        {
          d: "M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Nut = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 4V2" }],
      [
        "path",
        {
          d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"
        }
      ],
      [
        "path",
        {
          d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"
        }
      ]
    ]
  ];

  const Octagon = [
    "svg",
    defaultAttributes,
    [
      [
        "polygon",
        {
          points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
        }
      ]
    ]
  ];

  const Option = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3h6l6 18h6" }],
      ["path", { d: "M14 3h7" }]
    ]
  ];

  const Orbit = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["circle", { cx: "19", cy: "5", r: "2" }],
      ["circle", { cx: "5", cy: "19", r: "2" }],
      ["path", { d: "M10.4 21.9a10 10 0 0 0 9.941-15.416" }],
      ["path", { d: "M13.5 2.1a10 10 0 0 0-9.841 15.416" }]
    ]
  ];

  const Outdent = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "7 8 3 12 7 16" }],
      ["line", { x1: "21", x2: "11", y1: "12", y2: "12" }],
      ["line", { x1: "21", x2: "11", y1: "6", y2: "6" }],
      ["line", { x1: "21", x2: "11", y1: "18", y2: "18" }]
    ]
  ];

  const Package2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" }],
      [
        "path",
        { d: "m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" }
      ],
      ["path", { d: "M12 3v6" }]
    ]
  ];

  const PackageCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m16 16 2 2 4-4" }],
      [
        "path",
        {
          d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
        }
      ],
      ["path", { d: "M16.5 9.4 7.55 4.24" }],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
    ]
  ];

  const PackageMinus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 16h6" }],
      [
        "path",
        {
          d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
        }
      ],
      ["path", { d: "M16.5 9.4 7.55 4.24" }],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
    ]
  ];

  const PackageOpen = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"
        }
      ],
      [
        "path",
        {
          d: "m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"
        }
      ],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "13" }],
      [
        "path",
        {
          d: "M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"
        }
      ]
    ]
  ];

  const PackagePlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 16h6" }],
      ["path", { d: "M19 13v6" }],
      [
        "path",
        {
          d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
        }
      ],
      ["path", { d: "M16.5 9.4 7.55 4.24" }],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
    ]
  ];

  const PackageSearch = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
        }
      ],
      ["path", { d: "M16.5 9.4 7.55 4.24" }],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }],
      ["circle", { cx: "18.5", cy: "15.5", r: "2.5" }],
      ["path", { d: "M20.27 17.27 22 19" }]
    ]
  ];

  const PackageX = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
        }
      ],
      ["path", { d: "M16.5 9.4 7.55 4.24" }],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }],
      ["path", { d: "m17 13 5 5m-5 0 5-5" }]
    ]
  ];

  const Package = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16.5 9.4 7.55 4.24" }],
      [
        "path",
        {
          d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        }
      ],
      ["polyline", { points: "3.29 7 12 12 20.71 7" }],
      ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
    ]
  ];

  const PaintBucket = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"
        }
      ],
      ["path", { d: "m5 2 5 5" }],
      ["path", { d: "M2 13h15" }],
      ["path", { d: "M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" }]
    ]
  ];

  const Paintbrush2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14 19.9V16h3a2 2 0 0 0 2-2v-2H5v2c0 1.1.9 2 2 2h3v3.9a2 2 0 1 0 4 0Z"
        }
      ],
      ["path", { d: "M6 12V2h12v10" }],
      ["path", { d: "M14 2v4" }],
      ["path", { d: "M10 2v2" }]
    ]
  ];

  const Paintbrush = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"
        }
      ],
      ["path", { d: "M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" }],
      ["path", { d: "M14.5 17.5 4.5 15" }]
    ]
  ];

  const Palette = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "13.5", cy: "6.5", r: ".5" }],
      ["circle", { cx: "17.5", cy: "10.5", r: ".5" }],
      ["circle", { cx: "8.5", cy: "7.5", r: ".5" }],
      ["circle", { cx: "6.5", cy: "12.5", r: ".5" }],
      [
        "path",
        {
          d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
        }
      ]
    ]
  ];

  const Palmtree = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" }],
      [
        "path",
        {
          d: "M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"
        }
      ],
      [
        "path",
        {
          d: "M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35z"
        }
      ],
      ["path", { d: "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" }]
    ]
  ];

  const PanelBottomClose = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }],
      ["path", { d: "m15 8-3 3-3-3" }]
    ]
  ];

  const PanelBottomInactive = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M14 15h1" }],
      ["path", { d: "M19 15h2" }],
      ["path", { d: "M3 15h2" }],
      ["path", { d: "M9 15h1" }]
    ]
  ];

  const PanelBottomOpen = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }],
      ["path", { d: "m9 10 3-3 3 3" }]
    ]
  ];

  const PanelBottom = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }]
    ]
  ];

  const PanelLeftClose = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M9 3v18" }],
      ["path", { d: "m16 15-3-3 3-3" }]
    ]
  ];

  const PanelLeftInactive = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M9 14v1" }],
      ["path", { d: "M9 19v2" }],
      ["path", { d: "M9 3v2" }],
      ["path", { d: "M9 9v1" }]
    ]
  ];

  const PanelLeftOpen = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "M9 3v18" }],
      ["path", { d: "m14 9 3 3-3 3" }]
    ]
  ];

  const PanelLeft = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "9", x2: "9", y1: "3", y2: "21" }]
    ]
  ];

  const PanelRightClose = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "15", x2: "15", y1: "3", y2: "21" }],
      ["path", { d: "m8 9 3 3-3 3" }]
    ]
  ];

  const PanelRightInactive = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M15 14v1" }],
      ["path", { d: "M15 19v2" }],
      ["path", { d: "M15 3v2" }],
      ["path", { d: "M15 9v1" }]
    ]
  ];

  const PanelRightOpen = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "15", x2: "15", y1: "3", y2: "21" }],
      ["path", { d: "m10 15-3-3 3-3" }]
    ]
  ];

  const PanelRight = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "15", x2: "15", y1: "3", y2: "21" }]
    ]
  ];

  const PanelTopClose = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
      ["path", { d: "m9 16 3-3 3 3" }]
    ]
  ];

  const PanelTopInactive = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M14 9h1" }],
      ["path", { d: "M19 9h2" }],
      ["path", { d: "M3 9h2" }],
      ["path", { d: "M9 9h1" }]
    ]
  ];

  const PanelTopOpen = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
      ["path", { d: "m15 14-3 3-3-3" }]
    ]
  ];

  const PanelTop = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }]
    ]
  ];

  const Paperclip = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
        }
      ]
    ]
  ];

  const Parentheses = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 21s-4-3-4-9 4-9 4-9" }],
      ["path", { d: "M16 3s4 3 4 9-4 9-4 9" }]
    ]
  ];

  const ParkingCircleOff = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m5 5 14 14" }],
      ["path", { d: "M13 13a3 3 0 1 0 0-6H9v2" }],
      ["path", { d: "M9 17v-2.34" }]
    ]
  ];

  const ParkingCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9" }]
    ]
  ];

  const ParkingSquareOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" }
      ],
      ["path", { d: "M3 8.7V19a2 2 0 0 0 2 2h10.3" }],
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M13 13a3 3 0 1 0 0-6H9v2" }],
      ["path", { d: "M9 17v-2.3" }]
    ]
  ];

  const ParkingSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9" }]
    ]
  ];

  const PartyPopper = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5.8 11.3 2 22l10.7-3.79" }],
      ["path", { d: "M4 3h.01" }],
      ["path", { d: "M22 8h.01" }],
      ["path", { d: "M15 2h.01" }],
      ["path", { d: "M22 20h.01" }],
      [
        "path",
        {
          d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"
        }
      ],
      [
        "path",
        {
          d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"
        }
      ],
      [
        "path",
        { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" }
      ],
      [
        "path",
        {
          d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
        }
      ]
    ]
  ];

  const PauseCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "10", x2: "10", y1: "15", y2: "9" }],
      ["line", { x1: "14", x2: "14", y1: "15", y2: "9" }]
    ]
  ];

  const PauseOctagon = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 15V9" }],
      ["path", { d: "M14 15V9" }],
      [
        "path",
        {
          d: "M7.714 2h8.572L22 7.714v8.572L16.286 22H7.714L2 16.286V7.714L7.714 2z"
        }
      ]
    ]
  ];

  const Pause = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "4", height: "16", x: "6", y: "4" }],
      ["rect", { width: "4", height: "16", x: "14", y: "4" }]
    ]
  ];

  const PcCase = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2" }],
      ["path", { d: "M15 14h.01" }],
      ["path", { d: "M9 6h6" }],
      ["path", { d: "M9 10h6" }]
    ]
  ];

  const PenLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 20h9" }],
      ["path", { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" }]
    ]
  ];

  const PenSquare = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }
      ],
      ["path", { d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" }]
    ]
  ];

  const PenTool = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m12 19 7-7 3 3-7 7-3-3z" }],
      ["path", { d: "m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" }],
      ["path", { d: "m2 2 7.586 7.586" }],
      ["circle", { cx: "11", cy: "11", r: "2" }]
    ]
  ];

  const Pen = [
    "svg",
    defaultAttributes,
    [["path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }]]
  ];

  const PencilLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 20h9" }],
      ["path", { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" }],
      ["path", { d: "m15 5 3 3" }]
    ]
  ];

  const PencilRuler = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m15 5 4 4" }],
      [
        "path",
        {
          d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"
        }
      ],
      ["path", { d: "m8 6 2-2" }],
      ["path", { d: "m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z" }],
      ["path", { d: "m18 16 2-2" }],
      [
        "path",
        {
          d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"
        }
      ]
    ]
  ];

  const Pencil = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }],
      ["path", { d: "m15 5 4 4" }]
    ]
  ];

  const Percent = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }],
      ["circle", { cx: "6.5", cy: "6.5", r: "2.5" }],
      ["circle", { cx: "17.5", cy: "17.5", r: "2.5" }]
    ]
  ];

  const PersonStanding = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "5", r: "1" }],
      ["path", { d: "m9 20 3-6 3 6" }],
      ["path", { d: "m6 8 6 2 6-2" }],
      ["path", { d: "M12 10v4" }]
    ]
  ];

  const PhoneCall = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        }
      ],
      ["path", { d: "M14.05 2a9 9 0 0 1 8 7.94" }],
      ["path", { d: "M14.05 6A5 5 0 0 1 18 10" }]
    ]
  ];

  const PhoneForwarded = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "18 2 22 6 18 10" }],
      ["line", { x1: "14", x2: "22", y1: "6", y2: "6" }],
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        }
      ]
    ]
  ];

  const PhoneIncoming = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "16 2 16 8 22 8" }],
      ["line", { x1: "22", x2: "16", y1: "2", y2: "8" }],
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        }
      ]
    ]
  ];

  const PhoneMissed = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "22", x2: "16", y1: "2", y2: "8" }],
      ["line", { x1: "16", x2: "22", y1: "2", y2: "8" }],
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        }
      ]
    ]
  ];

  const PhoneOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
        }
      ],
      ["line", { x1: "22", x2: "2", y1: "2", y2: "22" }]
    ]
  ];

  const PhoneOutgoing = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "22 8 22 2 16 2" }],
      ["line", { x1: "16", x2: "22", y1: "8", y2: "2" }],
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        }
      ]
    ]
  ];

  const Phone = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        }
      ]
    ]
  ];

  const PiSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M7 7h10" }],
      ["path", { d: "M10 7v10" }],
      ["path", { d: "M16 17a2 2 0 0 1-2-2V7" }]
    ]
  ];

  const Pi = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "9", x2: "9", y1: "4", y2: "20" }],
      ["path", { d: "M4 7c0-1.7 1.3-3 3-3h13" }],
      ["path", { d: "M18 20c-1.7 0-3-1.3-3-3V4" }]
    ]
  ];

  const PictureInPicture2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }],
      ["rect", { width: "10", height: "7", x: "12", y: "13", rx: "2" }]
    ]
  ];

  const PictureInPicture = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8 4.5v5H3m-1-6 6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3"
        }
      ],
      ["rect", { width: "10", height: "7", x: "12", y: "13.5", ry: "2" }]
    ]
  ];

  const PieChart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" }],
      ["path", { d: "M22 12A10 10 0 0 0 12 2v10z" }]
    ]
  ];

  const PiggyBank = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"
        }
      ],
      ["path", { d: "M2 9v1c0 1.1.9 2 2 2h1" }],
      ["path", { d: "M16 11h0" }]
    ]
  ];

  const PilcrowSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17" }],
      ["path", { d: "M12 7v10" }],
      ["path", { d: "M16 7v10" }]
    ]
  ];

  const Pilcrow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13 4v16" }],
      ["path", { d: "M17 4v16" }],
      ["path", { d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13" }]
    ]
  ];

  const Pill = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" }
      ],
      ["path", { d: "m8.5 8.5 7 7" }]
    ]
  ];

  const PinOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
      ["line", { x1: "12", x2: "12", y1: "17", y2: "22" }],
      [
        "path",
        { d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12" }
      ],
      ["path", { d: "M15 9.34V6h1a2 2 0 0 0 0-4H7.89" }]
    ]
  ];

  const Pin = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "12", y1: "17", y2: "22" }],
      [
        "path",
        {
          d: "M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"
        }
      ]
    ]
  ];

  const Pipette = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 22 1-1h3l9-9" }],
      ["path", { d: "M3 21v-3l9-9" }],
      [
        "path",
        {
          d: "m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"
        }
      ]
    ]
  ];

  const Pizza = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 11h.01" }],
      ["path", { d: "M11 15h.01" }],
      ["path", { d: "M16 16h.01" }],
      ["path", { d: "m2 16 20 6-6-20A20 20 0 0 0 2 16" }],
      ["path", { d: "M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" }]
    ]
  ];

  const PlaneLanding = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 22h20" }],
      [
        "path",
        {
          d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"
        }
      ]
    ]
  ];

  const PlaneTakeoff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 22h20" }],
      [
        "path",
        {
          d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
        }
      ]
    ]
  ];

  const Plane = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
        }
      ]
    ]
  ];

  const PlayCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polygon", { points: "10 8 16 12 10 16 10 8" }]
    ]
  ];

  const PlaySquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m9 8 6 4-6 4Z" }]
    ]
  ];

  const Play = [
    "svg",
    defaultAttributes,
    [["polygon", { points: "5 3 19 12 5 21 5 3" }]]
  ];

  const Plug2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 2v6" }],
      ["path", { d: "M15 2v6" }],
      ["path", { d: "M12 17v5" }],
      ["path", { d: "M5 8h14" }],
      ["path", { d: "M6 11V8h12v3a6 6 0 1 1-12 0v0Z" }]
    ]
  ];

  const PlugZap2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m13 2-2 2.5h3L12 7" }],
      ["path", { d: "M10 14v-3" }],
      ["path", { d: "M14 14v-3" }],
      ["path", { d: "M11 19c-1.7 0-3-1.3-3-3v-2h8v2c0 1.7-1.3 3-3 3Z" }],
      ["path", { d: "M12 22v-3" }]
    ]
  ];

  const PlugZap = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
        }
      ],
      ["path", { d: "m2 22 3-3" }],
      ["path", { d: "M7.5 13.5 10 11" }],
      ["path", { d: "M10.5 16.5 13 14" }],
      ["path", { d: "m18 3-4 4h6l-4 4" }]
    ]
  ];

  const Plug = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22v-5" }],
      ["path", { d: "M9 8V2" }],
      ["path", { d: "M15 8V2" }],
      ["path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" }]
    ]
  ];

  const PlusCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M8 12h8" }],
      ["path", { d: "M12 8v8" }]
    ]
  ];

  const PlusSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M8 12h8" }],
      ["path", { d: "M12 8v8" }]
    ]
  ];

  const Plus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "M12 5v14" }]
    ]
  ];

  const PocketKnife = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" }],
      ["path", { d: "M18 6h.01" }],
      ["path", { d: "M6 18h.01" }],
      [
        "path",
        { d: "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" }
      ],
      ["path", { d: "M18 11.66V22a4 4 0 0 0 4-4V6" }]
    ]
  ];

  const Pocket = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"
        }
      ],
      ["polyline", { points: "8 10 12 14 16 10" }]
    ]
  ];

  const Podcast = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "11", r: "1" }],
      [
        "path",
        {
          d: "M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5Z"
        }
      ],
      ["path", { d: "M8 14a5 5 0 1 1 8 0" }],
      ["path", { d: "M17 18.5a9 9 0 1 0-10 0" }]
    ]
  ];

  const Pointer = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 14a8 8 0 0 1-8 8" }],
      ["path", { d: "M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" }],
      ["path", { d: "M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1" }],
      ["path", { d: "M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10" }],
      [
        "path",
        {
          d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
        }
      ]
    ]
  ];

  const Popcorn = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"
        }
      ],
      ["path", { d: "M10 22 9 8" }],
      ["path", { d: "m14 22 1-14" }],
      [
        "path",
        {
          d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"
        }
      ]
    ]
  ];

  const Popsicle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"
        }
      ],
      ["path", { d: "m22 22-5.5-5.5" }]
    ]
  ];

  const PoundSterling = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 7c0-5.333-8-5.333-8 0" }],
      ["path", { d: "M10 7v14" }],
      ["path", { d: "M6 21h12" }],
      ["path", { d: "M6 13h10" }]
    ]
  ];

  const PowerOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15" }],
      ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" }],
      ["path", { d: "M12 2v4" }],
      ["path", { d: "m2 2 20 20" }]
    ]
  ];

  const Power = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18.36 6.64a9 9 0 1 1-12.73 0" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "12" }]
    ]
  ];

  const Presentation = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 3h20" }],
      ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" }],
      ["path", { d: "m7 21 5-5 5 5" }]
    ]
  ];

  const Printer = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "6 9 6 2 18 2 18 9" }],
      [
        "path",
        {
          d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
        }
      ],
      ["rect", { width: "12", height: "8", x: "6", y: "14" }]
    ]
  ];

  const Projector = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 7 3 5" }],
      ["path", { d: "M9 6V3" }],
      ["path", { d: "m13 7 2-2" }],
      ["circle", { cx: "9", cy: "13", r: "3" }],
      [
        "path",
        {
          d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"
        }
      ],
      ["path", { d: "M16 16h2" }]
    ]
  ];

  const Puzzle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"
        }
      ]
    ]
  ];

  const QrCode = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1" }],
      ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1" }],
      ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1" }],
      ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3" }],
      ["path", { d: "M21 21v.01" }],
      ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7" }],
      ["path", { d: "M3 12h.01" }],
      ["path", { d: "M12 3h.01" }],
      ["path", { d: "M12 16v.01" }],
      ["path", { d: "M16 12h1" }],
      ["path", { d: "M21 12v.01" }],
      ["path", { d: "M12 21v-1" }]
    ]
  ];

  const Quote = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
        }
      ],
      [
        "path",
        {
          d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
        }
      ]
    ]
  ];

  const Radar = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34" }],
      ["path", { d: "M4 6h.01" }],
      ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35" }],
      ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67" }],
      ["path", { d: "M12 18h.01" }],
      ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67" }],
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "m13.41 10.59 5.66-5.66" }]
    ]
  ];

  const Radiation = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 12h0" }],
      [
        "path",
        {
          d: "M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z"
        }
      ],
      [
        "path",
        {
          d: "M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z"
        }
      ],
      [
        "path",
        {
          d: "M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z"
        }
      ]
    ]
  ];

  const RadioReceiver = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 16v2" }],
      ["path", { d: "M19 16v2" }],
      ["rect", { width: "20", height: "8", x: "2", y: "8", rx: "2" }],
      ["path", { d: "M18 12h0" }]
    ]
  ];

  const RadioTower = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" }],
      ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" }],
      ["circle", { cx: "12", cy: "9", r: "2" }],
      ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" }],
      ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" }],
      ["path", { d: "M9.5 18h5" }],
      ["path", { d: "m8 22 4-11 4 11" }]
    ]
  ];

  const Radio = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9" }],
      ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" }],
      ["circle", { cx: "12", cy: "12", r: "2" }],
      ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" }],
      ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19" }]
    ]
  ];

  const Rainbow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 17a10 10 0 0 0-20 0" }],
      ["path", { d: "M6 17a6 6 0 0 1 12 0" }],
      ["path", { d: "M10 17a2 2 0 0 1 4 0" }]
    ]
  ];

  const Rat = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"
        }
      ],
      [
        "path",
        {
          d: "M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"
        }
      ],
      ["path", { d: "M13.2 18a3 3 0 0 0-2.2-5" }],
      ["path", { d: "M13 22H4a2 2 0 0 1 0-4h12" }],
      ["path", { d: "M16 9h.01" }]
    ]
  ];

  const Ratio = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2" }],
      ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
    ]
  ];

  const Receipt = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"
        }
      ],
      ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
      ["path", { d: "M12 17V7" }]
    ]
  ];

  const RectangleHorizontal = [
    "svg",
    defaultAttributes,
    [["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]]
  ];

  const RectangleVertical = [
    "svg",
    defaultAttributes,
    [["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2" }]]
  ];

  const Recycle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"
        }
      ],
      [
        "path",
        {
          d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"
        }
      ],
      ["path", { d: "m14 16-3 3 3 3" }],
      ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598" }],
      [
        "path",
        {
          d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"
        }
      ],
      ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096" }]
    ]
  ];

  const Redo2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m15 14 5-5-5-5" }],
      ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" }]
    ]
  ];

  const RedoDot = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "17", r: "1" }],
      ["path", { d: "M21 7v6h-6" }],
      ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" }]
    ]
  ];

  const Redo = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 7v6h-6" }],
      ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" }]
    ]
  ];

  const RefreshCcwDot = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 2v6h6" }],
      ["path", { d: "M21 12A9 9 0 0 0 6 5.3L3 8" }],
      ["path", { d: "M21 22v-6h-6" }],
      ["path", { d: "M3 12a9 9 0 0 0 15 6.7l3-2.7" }],
      ["circle", { cx: "12", cy: "12", r: "1" }]
    ]
  ];

  const RefreshCcw = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
      ["path", { d: "M3 3v5h5" }],
      ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }],
      ["path", { d: "M16 16h5v5" }]
    ]
  ];

  const RefreshCwOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" }
      ],
      ["path", { d: "M8 16H3v5" }],
      ["path", { d: "M3 12C3 9.51 4 7.26 5.64 5.64" }],
      [
        "path",
        { d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" }
      ],
      ["path", { d: "M21 12c0 1-.16 1.97-.47 2.87" }],
      ["path", { d: "M21 3v5h-5" }],
      ["path", { d: "M22 22 2 2" }]
    ]
  ];

  const RefreshCw = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
      ["path", { d: "M21 3v5h-5" }],
      ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
      ["path", { d: "M8 16H3v5" }]
    ]
  ];

  const Refrigerator = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"
        }
      ],
      ["path", { d: "M5 10h14" }],
      ["path", { d: "M15 7v6" }]
    ]
  ];

  const Regex = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 3v10" }],
      ["path", { d: "m12.67 5.5 8.66 5" }],
      ["path", { d: "m12.67 10.5 8.66-5" }],
      [
        "path",
        {
          d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"
        }
      ]
    ]
  ];

  const RemoveFormatting = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 7V4h16v3" }],
      ["path", { d: "M5 20h6" }],
      ["path", { d: "M13 4 8 20" }],
      ["path", { d: "m15 15 5 5" }],
      ["path", { d: "m20 15-5 5" }]
    ]
  ];

  const Repeat1 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m17 2 4 4-4 4" }],
      ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }],
      ["path", { d: "m7 22-4-4 4-4" }],
      ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3" }],
      ["path", { d: "M11 10h1v4" }]
    ]
  ];

  const Repeat2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 9 3-3 3 3" }],
      ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6" }],
      ["path", { d: "m22 15-3 3-3-3" }],
      ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10" }]
    ]
  ];

  const Repeat = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m17 2 4 4-4 4" }],
      ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }],
      ["path", { d: "m7 22-4-4 4-4" }],
      ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3" }]
    ]
  ];

  const ReplaceAll = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 4c0-1.1.9-2 2-2" }],
      ["path", { d: "M20 2c1.1 0 2 .9 2 2" }],
      ["path", { d: "M22 8c0 1.1-.9 2-2 2" }],
      ["path", { d: "M16 10c-1.1 0-2-.9-2-2" }],
      ["path", { d: "m3 7 3 3 3-3" }],
      ["path", { d: "M6 10V5c0-1.7 1.3-3 3-3h1" }],
      ["rect", { width: "8", height: "8", x: "2", y: "14", rx: "2" }],
      ["path", { d: "M14 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" }],
      ["path", { d: "M20 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" }]
    ]
  ];

  const Replace = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 4c0-1.1.9-2 2-2" }],
      ["path", { d: "M20 2c1.1 0 2 .9 2 2" }],
      ["path", { d: "M22 8c0 1.1-.9 2-2 2" }],
      ["path", { d: "M16 10c-1.1 0-2-.9-2-2" }],
      ["path", { d: "m3 7 3 3 3-3" }],
      ["path", { d: "M6 10V5c0-1.7 1.3-3 3-3h1" }],
      ["rect", { width: "8", height: "8", x: "2", y: "14", rx: "2" }]
    ]
  ];

  const ReplyAll = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "7 17 2 12 7 7" }],
      ["polyline", { points: "12 17 7 12 12 7" }],
      ["path", { d: "M22 18v-2a4 4 0 0 0-4-4H7" }]
    ]
  ];

  const Reply = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "9 17 4 12 9 7" }],
      ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4" }]
    ]
  ];

  const Rewind = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "11 19 2 12 11 5 11 19" }],
      ["polygon", { points: "22 19 13 12 22 5 22 19" }]
    ]
  ];

  const Rocket = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        }
      ],
      [
        "path",
        {
          d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        }
      ],
      ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }],
      ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }]
    ]
  ];

  const RockingChair = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "3.5 2 6.5 12.5 18 12.5" }],
      ["line", { x1: "9.5", x2: "5.5", y1: "12.5", y2: "20" }],
      ["line", { x1: "15", x2: "18.5", y1: "12.5", y2: "20" }],
      ["path", { d: "M2.75 18a13 13 0 0 0 18.5 0" }]
    ]
  ];

  const RollerCoaster = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 19V5" }],
      ["path", { d: "M10 19V6.8" }],
      ["path", { d: "M14 19v-7.8" }],
      ["path", { d: "M18 5v4" }],
      ["path", { d: "M18 19v-6" }],
      ["path", { d: "M22 19V9" }],
      [
        "path",
        { d: "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" }
      ]
    ]
  ];

  const Rotate3d = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"
        }
      ],
      ["path", { d: "m15.194 13.707 3.814 1.86-1.86 3.814" }],
      [
        "path",
        {
          d: "M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"
        }
      ]
    ]
  ];

  const RotateCcw = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
      ["path", { d: "M3 3v5h5" }]
    ]
  ];

  const RotateCw = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }],
      ["path", { d: "M21 3v5h-5" }]
    ]
  ];

  const Router = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
      ["path", { d: "M6.01 18H6" }],
      ["path", { d: "M10.01 18H10" }],
      ["path", { d: "M15 10v4" }],
      ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0" }],
      ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0" }]
    ]
  ];

  const Rows = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "12", y2: "12" }]
    ]
  ];

  const Rss = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 11a9 9 0 0 1 9 9" }],
      ["path", { d: "M4 4a16 16 0 0 1 16 16" }],
      ["circle", { cx: "5", cy: "19", r: "1" }]
    ]
  ];

  const Ruler = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
        }
      ],
      ["path", { d: "m14.5 12.5 2-2" }],
      ["path", { d: "m11.5 9.5 2-2" }],
      ["path", { d: "m8.5 6.5 2-2" }],
      ["path", { d: "m17.5 15.5 2-2" }]
    ]
  ];

  const RussianRuble = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 11c5.333 0 5.333-8 0-8" }],
      ["path", { d: "M6 11h8" }],
      ["path", { d: "M6 15h8" }],
      ["path", { d: "M9 21V3" }],
      ["path", { d: "M9 3h5" }]
    ]
  ];

  const Sailboat = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" }],
      ["path", { d: "M21 14 10 2 3 14h18Z" }],
      ["path", { d: "M10 2v16" }]
    ]
  ];

  const Salad = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 21h10" }],
      ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }],
      [
        "path",
        {
          d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"
        }
      ],
      ["path", { d: "m13 12 4-4" }],
      ["path", { d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" }]
    ]
  ];

  const Sandwich = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" }],
      [
        "path",
        {
          d: "M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"
        }
      ],
      ["path", { d: "m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" }],
      ["path", { d: "M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" }]
    ]
  ];

  const SatelliteDish = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 10a7.31 7.31 0 0 0 10 10Z" }],
      ["path", { d: "m9 15 3-3" }],
      ["path", { d: "M17 13a6 6 0 0 0-6-6" }],
      ["path", { d: "M21 13A10 10 0 0 0 11 3" }]
    ]
  ];

  const Satellite = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M13 7 9 3 5 7l4 4" }],
      ["path", { d: "m17 11 4 4-4 4-4-4" }],
      ["path", { d: "m8 12 4 4 6-6-4-4Z" }],
      ["path", { d: "m16 8 3-3" }],
      ["path", { d: "M9 21a6 6 0 0 0-6-6" }]
    ]
  ];

  const SaveAll = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M6 4a2 2 0 0 1 2-2h10l4 4v10.2a2 2 0 0 1-2 1.8H8a2 2 0 0 1-2-2Z" }
      ],
      ["path", { d: "M10 2v4h6" }],
      ["path", { d: "M18 18v-7h-8v7" }],
      ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6" }]
    ]
  ];

  const Save = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }
      ],
      ["polyline", { points: "17 21 17 13 7 13 7 21" }],
      ["polyline", { points: "7 3 7 8 15 8" }]
    ]
  ];

  const Scale3d = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "19", cy: "19", r: "2" }],
      ["circle", { cx: "5", cy: "5", r: "2" }],
      ["path", { d: "M5 7v12h12" }],
      ["path", { d: "m5 19 6-6" }]
    ]
  ];

  const Scale = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" }],
      ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" }],
      ["path", { d: "M7 21h10" }],
      ["path", { d: "M12 3v18" }],
      ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" }]
    ]
  ];

  const Scaling = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 3 9 15" }],
      ["path", { d: "M12 3H3v18h18v-9" }],
      ["path", { d: "M16 3h5v5" }],
      ["path", { d: "M14 15H9v-5" }]
    ]
  ];

  const ScanFace = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
      ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
      ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
      ["path", { d: "M9 9h.01" }],
      ["path", { d: "M15 9h.01" }]
    ]
  ];

  const ScanLine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
      ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
      ["line", { x1: "7", x2: "17", y1: "12", y2: "12" }]
    ]
  ];

  const Scan = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
      ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }]
    ]
  ];

  const ScatterChart = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "7.5", cy: "7.5", r: ".5" }],
      ["circle", { cx: "18.5", cy: "5.5", r: ".5" }],
      ["circle", { cx: "11.5", cy: "11.5", r: ".5" }],
      ["circle", { cx: "7.5", cy: "16.5", r: ".5" }],
      ["circle", { cx: "17.5", cy: "14.5", r: ".5" }],
      ["path", { d: "M3 3v18h18" }]
    ]
  ];

  const School2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "10", r: "1" }],
      [
        "path",
        { d: "M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" }
      ],
      ["path", { d: "M6 17v.01" }],
      ["path", { d: "M6 13v.01" }],
      ["path", { d: "M18 17v.01" }],
      ["path", { d: "M18 13v.01" }],
      ["path", { d: "M14 22v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" }]
    ]
  ];

  const School = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m4 6 8-4 8 4" }],
      ["path", { d: "m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" }],
      ["path", { d: "M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" }],
      ["path", { d: "M18 5v17" }],
      ["path", { d: "M6 5v17" }],
      ["circle", { cx: "12", cy: "9", r: "2" }]
    ]
  ];

  const ScissorsLineDashed = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5.42 9.42 8 12" }],
      ["circle", { cx: "4", cy: "8", r: "2" }],
      ["path", { d: "m14 6-8.58 8.58" }],
      ["circle", { cx: "4", cy: "16", r: "2" }],
      ["path", { d: "M10.8 14.8 14 18" }],
      ["path", { d: "M16 12h-2" }],
      ["path", { d: "M22 12h-2" }]
    ]
  ];

  const ScissorsSquareDashedBottom = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2"
        }
      ],
      ["path", { d: "M10 22H8" }],
      ["path", { d: "M16 22h-2" }],
      ["circle", { cx: "8", cy: "8", r: "2" }],
      ["path", { d: "M9.414 9.414 12 12" }],
      ["path", { d: "M14.8 14.8 18 18" }],
      ["circle", { cx: "8", cy: "16", r: "2" }],
      ["path", { d: "m18 6-8.586 8.586" }]
    ]
  ];

  const ScissorsSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "2" }],
      ["circle", { cx: "8", cy: "8", r: "2" }],
      ["path", { d: "M9.414 9.414 12 12" }],
      ["path", { d: "M14.8 14.8 18 18" }],
      ["circle", { cx: "8", cy: "16", r: "2" }],
      ["path", { d: "m18 6-8.586 8.586" }]
    ]
  ];

  const Scissors = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "6", cy: "6", r: "3" }],
      ["path", { d: "M8.12 8.12 12 12" }],
      ["path", { d: "M20 4 8.12 15.88" }],
      ["circle", { cx: "6", cy: "18", r: "3" }],
      ["path", { d: "M14.8 14.8 20 20" }]
    ]
  ];

  const ScreenShareOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" }
      ],
      ["path", { d: "M8 21h8" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "m22 3-5 5" }],
      ["path", { d: "m17 3 5 5" }]
    ]
  ];

  const ScreenShare = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" }
      ],
      ["path", { d: "M8 21h8" }],
      ["path", { d: "M12 17v4" }],
      ["path", { d: "m17 8 5-5" }],
      ["path", { d: "M17 3h5v5" }]
    ]
  ];

  const ScrollText = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" }
      ],
      ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }],
      ["path", { d: "M15 8h-5" }],
      ["path", { d: "M15 12h-5" }]
    ]
  ];

  const Scroll = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" }
      ],
      ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }]
    ]
  ];

  const SearchCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m8 11 2 2 4-4" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }]
    ]
  ];

  const SearchCode = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 9-2 2 2 2" }],
      ["path", { d: "m13 13 2-2-2-2" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }]
    ]
  ];

  const SearchSlash = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m13.5 8.5-5 5" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }]
    ]
  ];

  const SearchX = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m13.5 8.5-5 5" }],
      ["path", { d: "m8.5 8.5 5 5" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }]
    ]
  ];

  const Search = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }]
    ]
  ];

  const SendHorizonal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 3 3 9-3 9 19-9Z" }],
      ["path", { d: "M6 12h16" }]
    ]
  ];

  const SendToBack = [
    "svg",
    defaultAttributes,
    [
      ["rect", { x: "14", y: "14", width: "8", height: "8", rx: "2" }],
      ["rect", { x: "2", y: "2", width: "8", height: "8", rx: "2" }],
      ["path", { d: "M7 14v1a2 2 0 0 0 2 2h1" }],
      ["path", { d: "M14 7h1a2 2 0 0 1 2 2v1" }]
    ]
  ];

  const Send = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m22 2-7 20-4-9-9-4Z" }],
      ["path", { d: "M22 2 11 13" }]
    ]
  ];

  const SeparatorHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "3", x2: "21", y1: "12", y2: "12" }],
      ["polyline", { points: "8 8 12 4 16 8" }],
      ["polyline", { points: "16 16 12 20 8 16" }]
    ]
  ];

  const SeparatorVertical = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "12", x2: "12", y1: "3", y2: "21" }],
      ["polyline", { points: "8 8 4 12 8 16" }],
      ["polyline", { points: "16 16 20 12 16 8" }]
    ]
  ];

  const ServerCog = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"
        }
      ],
      [
        "path",
        {
          d: "M5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1"
        }
      ],
      ["path", { d: "M6 6h.01" }],
      ["path", { d: "M6 18h.01" }],
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["path", { d: "M12 8v1" }],
      ["path", { d: "M12 15v1" }],
      ["path", { d: "M16 12h-1" }],
      ["path", { d: "M9 12H8" }],
      ["path", { d: "m15 9-.88.88" }],
      ["path", { d: "M9.88 14.12 9 15" }],
      ["path", { d: "m15 15-.88-.88" }],
      ["path", { d: "M9.88 9.88 9 9" }]
    ]
  ];

  const ServerCrash = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"
        }
      ],
      [
        "path",
        {
          d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"
        }
      ],
      ["path", { d: "M6 6h.01" }],
      ["path", { d: "M6 18h.01" }],
      ["path", { d: "m13 6-4 6h6l-4 6" }]
    ]
  ];

  const ServerOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" }],
      ["path", { d: "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z" }],
      ["path", { d: "M22 17v-1a2 2 0 0 0-2-2h-1" }],
      ["path", { d: "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z" }],
      ["path", { d: "M6 18h.01" }],
      ["path", { d: "m2 2 20 20" }]
    ]
  ];

  const Server = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2" }],
      ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2" }],
      ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6" }],
      ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18" }]
    ]
  ];

  const Settings2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 7h-9" }],
      ["path", { d: "M14 17H5" }],
      ["circle", { cx: "17", cy: "17", r: "3" }],
      ["circle", { cx: "7", cy: "7", r: "3" }]
    ]
  ];

  const Settings = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        }
      ],
      ["circle", { cx: "12", cy: "12", r: "3" }]
    ]
  ];

  const Shapes = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
        }
      ],
      ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }],
      ["circle", { cx: "17.5", cy: "17.5", r: "3.5" }]
    ]
  ];

  const Share2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "18", cy: "5", r: "3" }],
      ["circle", { cx: "6", cy: "12", r: "3" }],
      ["circle", { cx: "18", cy: "19", r: "3" }],
      ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }],
      ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" }]
    ]
  ];

  const Share = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }],
      ["polyline", { points: "16 6 12 2 8 6" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "15" }]
    ]
  ];

  const Sheet = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
      ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }],
      ["line", { x1: "9", x2: "9", y1: "9", y2: "21" }],
      ["line", { x1: "15", x2: "15", y1: "9", y2: "21" }]
    ]
  ];

  const ShieldAlert = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }],
      ["path", { d: "M12 8v4" }],
      ["path", { d: "M12 16h.01" }]
    ]
  ];

  const ShieldCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }],
      ["path", { d: "m9 12 2 2 4-4" }]
    ]
  ];

  const ShieldClose = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }],
      ["line", { x1: "9.5", x2: "14.5", y1: "9", y2: "14" }],
      ["line", { x1: "14.5", x2: "9.5", y1: "9", y2: "14" }]
    ]
  ];

  const ShieldOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18" }],
      [
        "path",
        { d: "M4.73 4.73 4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38" }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const ShieldQuestion = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 17h.01" }],
      ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }],
      ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" }]
    ]
  ];

  const Shield = [
    "svg",
    defaultAttributes,
    [["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }]]
  ];

  const Ship = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        }
      ],
      [
        "path",
        { d: "M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" }
      ],
      ["path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" }],
      ["path", { d: "M12 10v4" }],
      ["path", { d: "M12 2v3" }]
    ]
  ];

  const Shirt = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"
        }
      ]
    ]
  ];

  const ShoppingBag = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }],
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M16 10a4 4 0 0 1-8 0" }]
    ]
  ];

  const ShoppingBasket = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m5 11 4-7" }],
      ["path", { d: "m19 11-4-7" }],
      ["path", { d: "M2 11h20" }],
      [
        "path",
        { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" }
      ],
      ["path", { d: "m9 11 1 9" }],
      ["path", { d: "M4.5 15.5h15" }],
      ["path", { d: "m15 11-1 9" }]
    ]
  ];

  const ShoppingCart = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "8", cy: "21", r: "1" }],
      ["circle", { cx: "19", cy: "21", r: "1" }],
      [
        "path",
        {
          d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
        }
      ]
    ]
  ];

  const Shovel = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 22v-5l5-5 5 5-5 5z" }],
      ["path", { d: "M9.5 14.5 16 8" }],
      [
        "path",
        {
          d: "m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2"
        }
      ]
    ]
  ];

  const ShowerHead = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m4 4 2.5 2.5" }],
      ["path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7" }],
      ["path", { d: "M15 5 5 15" }],
      ["path", { d: "M14 17v.01" }],
      ["path", { d: "M10 16v.01" }],
      ["path", { d: "M13 13v.01" }],
      ["path", { d: "M16 10v.01" }],
      ["path", { d: "M11 20v.01" }],
      ["path", { d: "M17 14v.01" }],
      ["path", { d: "M20 11v.01" }]
    ]
  ];

  const Shrink = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8" }],
      ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6" }],
      ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6" }],
      ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3" }]
    ]
  ];

  const Shrub = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22v-7l-2-2" }],
      [
        "path",
        {
          d: "M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"
        }
      ],
      ["path", { d: "m14 14-2 2" }]
    ]
  ];

  const Shuffle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" }
      ],
      ["path", { d: "m18 2 4 4-4 4" }],
      ["path", { d: "M2 6h1.9c1.5 0 2.9.9 3.6 2.2" }],
      ["path", { d: "M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" }],
      ["path", { d: "m18 14 4 4-4 4" }]
    ]
  ];

  const SigmaSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M16 8.9V7H8l4 5-4 5h8v-1.9" }]
    ]
  ];

  const Sigma = [
    "svg",
    defaultAttributes,
    [["path", { d: "M18 7V4H6l6 8-6 8h12v-3" }]]
  ];

  const SignalHigh = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 20h.01" }],
      ["path", { d: "M7 20v-4" }],
      ["path", { d: "M12 20v-8" }],
      ["path", { d: "M17 20V8" }]
    ]
  ];

  const SignalLow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 20h.01" }],
      ["path", { d: "M7 20v-4" }]
    ]
  ];

  const SignalMedium = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 20h.01" }],
      ["path", { d: "M7 20v-4" }],
      ["path", { d: "M12 20v-8" }]
    ]
  ];

  const SignalZero = [
    "svg",
    defaultAttributes,
    [["path", { d: "M2 20h.01" }]]
  ];

  const Signal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 20h.01" }],
      ["path", { d: "M7 20v-4" }],
      ["path", { d: "M12 20v-8" }],
      ["path", { d: "M17 20V8" }],
      ["path", { d: "M22 4v16" }]
    ]
  ];

  const Siren = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z" }],
      ["path", { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2H5v-2Z" }],
      ["path", { d: "M21 12h1" }],
      ["path", { d: "M18.5 4.5 18 5" }],
      ["path", { d: "M2 12h1" }],
      ["path", { d: "M12 2v1" }],
      ["path", { d: "m4.929 4.929.707.707" }],
      ["path", { d: "M12 12v6" }]
    ]
  ];

  const SkipBack = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "19 20 9 12 19 4 19 20" }],
      ["line", { x1: "5", x2: "5", y1: "19", y2: "5" }]
    ]
  ];

  const SkipForward = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "5 4 15 12 5 20 5 4" }],
      ["line", { x1: "19", x2: "19", y1: "5", y2: "19" }]
    ]
  ];

  const Skull = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "9", cy: "12", r: "1" }],
      ["circle", { cx: "15", cy: "12", r: "1" }],
      ["path", { d: "M8 20v2h8v-2" }],
      ["path", { d: "m12.5 17-.5-1-.5 1h1z" }],
      [
        "path",
        { d: "M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20" }
      ]
    ]
  ];

  const Slack = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "3", height: "8", x: "13", y: "2", rx: "1.5" }],
      ["path", { d: "M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" }],
      ["rect", { width: "3", height: "8", x: "8", y: "14", rx: "1.5" }],
      ["path", { d: "M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" }],
      ["rect", { width: "8", height: "3", x: "14", y: "13", rx: "1.5" }],
      ["path", { d: "M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" }],
      ["rect", { width: "8", height: "3", x: "2", y: "8", rx: "1.5" }],
      ["path", { d: "M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" }]
    ]
  ];

  const Slice = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m8 14-6 6h9v-3" }],
      ["path", { d: "M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z" }]
    ]
  ];

  const SlidersHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "21", x2: "14", y1: "4", y2: "4" }],
      ["line", { x1: "10", x2: "3", y1: "4", y2: "4" }],
      ["line", { x1: "21", x2: "12", y1: "12", y2: "12" }],
      ["line", { x1: "8", x2: "3", y1: "12", y2: "12" }],
      ["line", { x1: "21", x2: "16", y1: "20", y2: "20" }],
      ["line", { x1: "12", x2: "3", y1: "20", y2: "20" }],
      ["line", { x1: "14", x2: "14", y1: "2", y2: "6" }],
      ["line", { x1: "8", x2: "8", y1: "10", y2: "14" }],
      ["line", { x1: "16", x2: "16", y1: "18", y2: "22" }]
    ]
  ];

  const Sliders = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "4", x2: "4", y1: "21", y2: "14" }],
      ["line", { x1: "4", x2: "4", y1: "10", y2: "3" }],
      ["line", { x1: "12", x2: "12", y1: "21", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "3" }],
      ["line", { x1: "20", x2: "20", y1: "21", y2: "16" }],
      ["line", { x1: "20", x2: "20", y1: "12", y2: "3" }],
      ["line", { x1: "2", x2: "6", y1: "14", y2: "14" }],
      ["line", { x1: "10", x2: "14", y1: "8", y2: "8" }],
      ["line", { x1: "18", x2: "22", y1: "16", y2: "16" }]
    ]
  ];

  const SmartphoneCharging = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
      ["path", { d: "M12.667 8 10 12h4l-2.667 4" }]
    ]
  ];

  const SmartphoneNfc = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "7", height: "12", x: "2", y: "6", rx: "1" }],
      ["path", { d: "M13 8.32a7.43 7.43 0 0 1 0 7.36" }],
      ["path", { d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58" }],
      ["path", { d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" }]
    ]
  ];

  const Smartphone = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
      ["path", { d: "M12 18h.01" }]
    ]
  ];

  const SmilePlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 11v1a10 10 0 1 1-9-10" }],
      ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
      ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
      ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }],
      ["path", { d: "M16 5h6" }],
      ["path", { d: "M19 2v6" }]
    ]
  ];

  const Smile = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
      ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
      ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
    ]
  ];

  const Snowflake = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
      ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }],
      ["path", { d: "m20 16-4-4 4-4" }],
      ["path", { d: "m4 8 4 4-4 4" }],
      ["path", { d: "m16 4-4 4-4-4" }],
      ["path", { d: "m8 20 4-4 4 4" }]
    ]
  ];

  const Sofa = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" }],
      [
        "path",
        {
          d: "M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"
        }
      ],
      ["path", { d: "M4 18v2" }],
      ["path", { d: "M20 18v2" }],
      ["path", { d: "M12 4v9" }]
    ]
  ];

  const Soup = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }],
      ["path", { d: "M7 21h10" }],
      ["path", { d: "M19.5 12 22 6" }],
      [
        "path",
        {
          d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"
        }
      ],
      [
        "path",
        {
          d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"
        }
      ],
      [
        "path",
        {
          d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"
        }
      ]
    ]
  ];

  const Space = [
    "svg",
    defaultAttributes,
    [["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }]]
  ];

  const Spade = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5 9c-1.5 1.5-3 3.2-3 5.5A5.5 5.5 0 0 0 7.5 20c1.8 0 3-.5 4.5-2 1.5 1.5 2.7 2 4.5 2a5.5 5.5 0 0 0 5.5-5.5c0-2.3-1.5-4-3-5.5l-7-7-7 7Z"
        }
      ],
      ["path", { d: "M12 18v4" }]
    ]
  ];

  const Sparkle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"
        }
      ]
    ]
  ];

  const Sparkles = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
        }
      ],
      ["path", { d: "M5 3v4" }],
      ["path", { d: "M19 17v4" }],
      ["path", { d: "M3 5h4" }],
      ["path", { d: "M17 19h4" }]
    ]
  ];

  const Speaker = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
      ["circle", { cx: "12", cy: "14", r: "4" }],
      ["line", { x1: "12", x2: "12.01", y1: "6", y2: "6" }]
    ]
  ];

  const SpellCheck2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m6 16 6-12 6 12" }],
      ["path", { d: "M8 12h8" }],
      [
        "path",
        {
          d: "M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"
        }
      ]
    ]
  ];

  const SpellCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m6 16 6-12 6 12" }],
      ["path", { d: "M8 12h8" }],
      ["path", { d: "m16 20 2 2 4-4" }]
    ]
  ];

  const Spline = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "19", cy: "5", r: "2" }],
      ["circle", { cx: "5", cy: "19", r: "2" }],
      ["path", { d: "M5 17A12 12 0 0 1 17 5" }]
    ]
  ];

  const SplitSquareHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" }],
      ["path", { d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" }],
      ["line", { x1: "12", x2: "12", y1: "4", y2: "20" }]
    ]
  ];

  const SplitSquareVertical = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" }],
      ["path", { d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" }],
      ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }]
    ]
  ];

  const Split = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 3h5v5" }],
      ["path", { d: "M8 3H3v5" }],
      ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" }],
      ["path", { d: "m15 9 6-6" }]
    ]
  ];

  const SprayCan = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 3h.01" }],
      ["path", { d: "M7 5h.01" }],
      ["path", { d: "M11 7h.01" }],
      ["path", { d: "M3 7h.01" }],
      ["path", { d: "M7 9h.01" }],
      ["path", { d: "M3 11h.01" }],
      ["rect", { width: "4", height: "4", x: "15", y: "5" }],
      ["path", { d: "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" }],
      ["path", { d: "m13 14 8-2" }],
      ["path", { d: "m13 19 8-2" }]
    ]
  ];

  const Sprout = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 20h10" }],
      ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10" }],
      [
        "path",
        {
          d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"
        }
      ],
      [
        "path",
        {
          d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"
        }
      ]
    ]
  ];

  const SquareAsterisk = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M12 8v8" }],
      ["path", { d: "m8.5 14 7-4" }],
      ["path", { d: "m8.5 10 7 4" }]
    ]
  ];

  const SquareCode = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "m10 10-2 2 2 2" }],
      ["path", { d: "m14 14 2-2-2-2" }]
    ]
  ];

  const SquareDashedBottomCode = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m10 10-2 2 2 2" }],
      ["path", { d: "m14 14 2-2-2-2" }],
      [
        "path",
        {
          d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"
        }
      ],
      ["path", { d: "M9 21h1" }],
      ["path", { d: "M14 21h1" }]
    ]
  ];

  const SquareDashedBottom = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"
        }
      ],
      ["path", { d: "M9 21h1" }],
      ["path", { d: "M14 21h1" }]
    ]
  ];

  const SquareDot = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["circle", { cx: "12", cy: "12", r: "1" }]
    ]
  ];

  const SquareEqual = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M7 10h10" }],
      ["path", { d: "M7 14h10" }]
    ]
  ];

  const SquareSlash = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["line", { x1: "9", x2: "15", y1: "15", y2: "9" }]
    ]
  ];

  const SquareStack = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
      ["path", { d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
      ["rect", { width: "8", height: "8", x: "14", y: "14", rx: "2" }]
    ]
  ];

  const Square = [
    "svg",
    defaultAttributes,
    [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]]
  ];

  const Squirrel = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"
        }
      ],
      [
        "path",
        { d: "M16 20c0-1.7 1.3-3 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" }
      ],
      ["path", { d: "M15.2 22a3 3 0 0 0-2.2-5" }],
      ["path", { d: "M18 13h.01" }]
    ]
  ];

  const Stamp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 22h14" }],
      [
        "path",
        {
          d: "M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"
        }
      ],
      [
        "path",
        {
          d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"
        }
      ]
    ]
  ];

  const StarHalf = [
    "svg",
    defaultAttributes,
    [["path", { d: "M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" }]]
  ];

  const StarOff = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43" }
      ],
      ["path", { d: "M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Star = [
    "svg",
    defaultAttributes,
    [
      [
        "polygon",
        {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        }
      ]
    ]
  ];

  const StepBack = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "18", x2: "18", y1: "20", y2: "4" }],
      ["polygon", { points: "14,20 4,12 14,4" }]
    ]
  ];

  const StepForward = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "6", x2: "6", y1: "4", y2: "20" }],
      ["polygon", { points: "10,4 20,12 10,20" }]
    ]
  ];

  const Stethoscope = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"
        }
      ],
      ["path", { d: "M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" }],
      ["circle", { cx: "20", cy: "10", r: "2" }]
    ]
  ];

  const Sticker = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"
        }
      ],
      ["path", { d: "M15 3v6h6" }],
      ["path", { d: "M10 16s.8 1 2 1c1.3 0 2-1 2-1" }],
      ["path", { d: "M8 13h0" }],
      ["path", { d: "M16 13h0" }]
    ]
  ];

  const StickyNote = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"
        }
      ],
      ["path", { d: "M15 3v6h6" }]
    ]
  ];

  const StopCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["rect", { width: "6", height: "6", x: "9", y: "9" }]
    ]
  ];

  const Store = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" }
      ],
      ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }],
      ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" }],
      ["path", { d: "M2 7h20" }],
      [
        "path",
        {
          d: "M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"
        }
      ]
    ]
  ];

  const StretchHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "6", x: "2", y: "4", rx: "2" }],
      ["rect", { width: "20", height: "6", x: "2", y: "14", rx: "2" }]
    ]
  ];

  const StretchVertical = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "6", height: "20", x: "4", y: "2", rx: "2" }],
      ["rect", { width: "6", height: "20", x: "14", y: "2", rx: "2" }]
    ]
  ];

  const Strikethrough = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4" }],
      ["path", { d: "M14 12a4 4 0 0 1 0 8H6" }],
      ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }]
    ]
  ];

  const Subscript = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m4 5 8 8" }],
      ["path", { d: "m12 5-8 8" }],
      [
        "path",
        {
          d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"
        }
      ]
    ]
  ];

  const Subtitles = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 13h4" }],
      ["path", { d: "M15 13h2" }],
      ["path", { d: "M7 9h2" }],
      ["path", { d: "M13 9h4" }],
      [
        "path",
        { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" }
      ]
    ]
  ];

  const SunDim = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M12 4h.01" }],
      ["path", { d: "M20 12h.01" }],
      ["path", { d: "M12 20h.01" }],
      ["path", { d: "M4 12h.01" }],
      ["path", { d: "M17.657 6.343h.01" }],
      ["path", { d: "M17.657 17.657h.01" }],
      ["path", { d: "M6.343 17.657h.01" }],
      ["path", { d: "M6.343 6.343h.01" }]
    ]
  ];

  const SunMedium = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M12 3v1" }],
      ["path", { d: "M12 20v1" }],
      ["path", { d: "M3 12h1" }],
      ["path", { d: "M20 12h1" }],
      ["path", { d: "m18.364 5.636-.707.707" }],
      ["path", { d: "m6.343 17.657-.707.707" }],
      ["path", { d: "m5.636 5.636.707.707" }],
      ["path", { d: "m17.657 17.657.707.707" }]
    ]
  ];

  const SunMoon = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M12 8a2 2 0 1 0 4 4" }],
      ["path", { d: "M12 2v2" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "m4.93 4.93 1.41 1.41" }],
      ["path", { d: "m17.66 17.66 1.41 1.41" }],
      ["path", { d: "M2 12h2" }],
      ["path", { d: "M20 12h2" }],
      ["path", { d: "m6.34 17.66-1.41 1.41" }],
      ["path", { d: "m19.07 4.93-1.41 1.41" }]
    ]
  ];

  const SunSnow = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 9a3 3 0 1 0 0 6" }],
      ["path", { d: "M2 12h1" }],
      ["path", { d: "M14 21V3" }],
      ["path", { d: "M10 4V3" }],
      ["path", { d: "M10 21v-1" }],
      ["path", { d: "m3.64 18.36.7-.7" }],
      ["path", { d: "m4.34 6.34-.7-.7" }],
      ["path", { d: "M14 12h8" }],
      ["path", { d: "m17 4-3 3" }],
      ["path", { d: "m14 17 3 3" }],
      ["path", { d: "m21 15-3-3 3-3" }]
    ]
  ];

  const Sun = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "4" }],
      ["path", { d: "M12 2v2" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "m4.93 4.93 1.41 1.41" }],
      ["path", { d: "m17.66 17.66 1.41 1.41" }],
      ["path", { d: "M2 12h2" }],
      ["path", { d: "M20 12h2" }],
      ["path", { d: "m6.34 17.66-1.41 1.41" }],
      ["path", { d: "m19.07 4.93-1.41 1.41" }]
    ]
  ];

  const Sunrise = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v8" }],
      ["path", { d: "m4.93 10.93 1.41 1.41" }],
      ["path", { d: "M2 18h2" }],
      ["path", { d: "M20 18h2" }],
      ["path", { d: "m19.07 10.93-1.41 1.41" }],
      ["path", { d: "M22 22H2" }],
      ["path", { d: "m8 6 4-4 4 4" }],
      ["path", { d: "M16 18a4 4 0 0 0-8 0" }]
    ]
  ];

  const Sunset = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 10V2" }],
      ["path", { d: "m4.93 10.93 1.41 1.41" }],
      ["path", { d: "M2 18h2" }],
      ["path", { d: "M20 18h2" }],
      ["path", { d: "m19.07 10.93-1.41 1.41" }],
      ["path", { d: "M22 22H2" }],
      ["path", { d: "m16 6-4 4-4-4" }],
      ["path", { d: "M16 18a4 4 0 0 0-8 0" }]
    ]
  ];

  const Superscript = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m4 19 8-8" }],
      ["path", { d: "m12 19-8-8" }],
      [
        "path",
        {
          d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"
        }
      ]
    ]
  ];

  const SwissFranc = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 21V3h8" }],
      ["path", { d: "M6 16h9" }],
      ["path", { d: "M10 9.5h7" }]
    ]
  ];

  const SwitchCamera = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" }],
      ["path", { d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" }],
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["path", { d: "m18 22-3-3 3-3" }],
      ["path", { d: "m6 2 3 3-3 3" }]
    ]
  ];

  const Sword = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" }],
      ["line", { x1: "13", x2: "19", y1: "19", y2: "13" }],
      ["line", { x1: "16", x2: "20", y1: "16", y2: "20" }],
      ["line", { x1: "19", x2: "21", y1: "21", y2: "19" }]
    ]
  ];

  const Swords = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" }],
      ["line", { x1: "13", x2: "19", y1: "19", y2: "13" }],
      ["line", { x1: "16", x2: "20", y1: "16", y2: "20" }],
      ["line", { x1: "19", x2: "21", y1: "21", y2: "19" }],
      ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5" }],
      ["line", { x1: "5", x2: "9", y1: "14", y2: "18" }],
      ["line", { x1: "7", x2: "4", y1: "17", y2: "20" }],
      ["line", { x1: "3", x2: "5", y1: "19", y2: "21" }]
    ]
  ];

  const Syringe = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m18 2 4 4" }],
      ["path", { d: "m17 7 3-3" }],
      [
        "path",
        { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" }
      ],
      ["path", { d: "m9 11 4 4" }],
      ["path", { d: "m5 19-3 3" }],
      ["path", { d: "m14 4 6 6" }]
    ]
  ];

  const Table2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
        }
      ]
    ]
  ];

  const TableProperties = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 3v18" }],
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M21 9H3" }],
      ["path", { d: "M21 15H3" }]
    ]
  ];

  const Table = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 3v18" }],
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M3 9h18" }],
      ["path", { d: "M3 15h18" }]
    ]
  ];

  const Tablet = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
      ["line", { x1: "12", x2: "12.01", y1: "18", y2: "18" }]
    ]
  ];

  const Tablets = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "7", cy: "7", r: "5" }],
      ["circle", { cx: "17", cy: "17", r: "5" }],
      ["path", { d: "M12 17h10" }],
      ["path", { d: "m3.46 10.54 7.08-7.08" }]
    ]
  ];

  const Tag = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
        }
      ],
      ["path", { d: "M7 7h.01" }]
    ]
  ];

  const Tags = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"
        }
      ],
      ["path", { d: "M6 9.01V9" }],
      ["path", { d: "m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" }]
    ]
  ];

  const Tally1 = [
    "svg",
    defaultAttributes,
    [["path", { d: "M4 4v16" }]]
  ];

  const Tally2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 4v16" }],
      ["path", { d: "M9 4v16" }]
    ]
  ];

  const Tally3 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 4v16" }],
      ["path", { d: "M9 4v16" }],
      ["path", { d: "M14 4v16" }]
    ]
  ];

  const Tally4 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 4v16" }],
      ["path", { d: "M9 4v16" }],
      ["path", { d: "M14 4v16" }],
      ["path", { d: "M19 4v16" }]
    ]
  ];

  const Tally5 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 4v16" }],
      ["path", { d: "M9 4v16" }],
      ["path", { d: "M14 4v16" }],
      ["path", { d: "M19 4v16" }],
      ["path", { d: "M22 6 2 18" }]
    ]
  ];

  const Target = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["circle", { cx: "12", cy: "12", r: "6" }],
      ["circle", { cx: "12", cy: "12", r: "2" }]
    ]
  ];

  const Tent = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 20 10 4" }],
      ["path", { d: "m5 20 9-16" }],
      ["path", { d: "M3 20h18" }],
      ["path", { d: "m12 15-3 5" }],
      ["path", { d: "m12 15 3 5" }]
    ]
  ];

  const TerminalSquare = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m7 11 2-2-2-2" }],
      ["path", { d: "M11 13h4" }],
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }]
    ]
  ];

  const Terminal = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "4 17 10 11 4 5" }],
      ["line", { x1: "12", x2: "20", y1: "19", y2: "19" }]
    ]
  ];

  const TestTube2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01v0a2.83 2.83 0 0 1 0-4L17 3"
        }
      ],
      ["path", { d: "m16 2 6 6" }],
      ["path", { d: "M12 16H4" }]
    ]
  ];

  const TestTube = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" }
      ],
      ["path", { d: "M8.5 2h7" }],
      ["path", { d: "M14.5 16h-5" }]
    ]
  ];

  const TestTubes = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2" }],
      [
        "path",
        { d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2" }
      ],
      ["path", { d: "M3 2h7" }],
      ["path", { d: "M14 2h7" }],
      ["path", { d: "M9 16H4" }],
      ["path", { d: "M20 16h-5" }]
    ]
  ];

  const TextCursorInput = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1" }],
      ["path", { d: "M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5" }],
      ["path", { d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" }],
      ["path", { d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" }],
      ["path", { d: "M9 7v10" }]
    ]
  ];

  const TextCursor = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" }],
      ["path", { d: "M7 22h1a4 4 0 0 0 4-4v-1" }],
      ["path", { d: "M7 2h1a4 4 0 0 1 4 4v1" }]
    ]
  ];

  const TextQuote = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 6H3" }],
      ["path", { d: "M21 12H8" }],
      ["path", { d: "M21 18H8" }],
      ["path", { d: "M3 12v6" }]
    ]
  ];

  const TextSelect = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
      ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
      ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
      ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
      ["path", { d: "M9 3h1" }],
      ["path", { d: "M9 21h1" }],
      ["path", { d: "M14 3h1" }],
      ["path", { d: "M14 21h1" }],
      ["path", { d: "M3 9v1" }],
      ["path", { d: "M21 9v1" }],
      ["path", { d: "M3 14v1" }],
      ["path", { d: "M21 14v1" }],
      ["line", { x1: "7", x2: "15", y1: "8", y2: "8" }],
      ["line", { x1: "7", x2: "17", y1: "12", y2: "12" }],
      ["line", { x1: "7", x2: "13", y1: "16", y2: "16" }]
    ]
  ];

  const Text = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 6.1H3" }],
      ["path", { d: "M21 12.1H3" }],
      ["path", { d: "M15.1 18H3" }]
    ]
  ];

  const ThermometerSnowflake = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12h10" }],
      ["path", { d: "M9 4v16" }],
      ["path", { d: "m3 9 3 3-3 3" }],
      ["path", { d: "M12 6 9 9 6 6" }],
      ["path", { d: "m6 18 3-3 1.5 1.5" }],
      ["path", { d: "M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]
    ]
  ];

  const ThermometerSun = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 9a4 4 0 0 0-2 7.5" }],
      ["path", { d: "M12 3v2" }],
      ["path", { d: "m6.6 18.4-1.4 1.4" }],
      ["path", { d: "M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }],
      ["path", { d: "M4 13H2" }],
      ["path", { d: "M6.34 7.34 4.93 5.93" }]
    ]
  ];

  const Thermometer = [
    "svg",
    defaultAttributes,
    [["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]]
  ];

  const ThumbsDown = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 14V2" }],
      [
        "path",
        {
          d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"
        }
      ]
    ]
  ];

  const ThumbsUp = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 10v12" }],
      [
        "path",
        {
          d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
        }
      ]
    ]
  ];

  const Ticket = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
        }
      ],
      ["path", { d: "M13 5v2" }],
      ["path", { d: "M13 17v2" }],
      ["path", { d: "M13 11v2" }]
    ]
  ];

  const TimerOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 2h4" }],
      ["path", { d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" }],
      ["path", { d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" }],
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M12 12v-2" }]
    ]
  ];

  const TimerReset = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 2h4" }],
      ["path", { d: "M12 14v-4" }],
      ["path", { d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" }],
      ["path", { d: "M9 17H4v5" }]
    ]
  ];

  const Timer = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "10", x2: "14", y1: "2", y2: "2" }],
      ["line", { x1: "12", x2: "15", y1: "14", y2: "11" }],
      ["circle", { cx: "12", cy: "14", r: "8" }]
    ]
  ];

  const ToggleLeft = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "6", ry: "6" }],
      ["circle", { cx: "8", cy: "12", r: "2" }]
    ]
  ];

  const ToggleRight = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "6", ry: "6" }],
      ["circle", { cx: "16", cy: "12", r: "2" }]
    ]
  ];

  const Tornado = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 4H3" }],
      ["path", { d: "M18 8H6" }],
      ["path", { d: "M19 12H9" }],
      ["path", { d: "M16 16h-6" }],
      ["path", { d: "M11 20H9" }]
    ]
  ];

  const TouchpadOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16" }],
      ["path", { d: "M2 14h12" }],
      ["path", { d: "M22 14h-2" }],
      ["path", { d: "M12 20v-6" }],
      ["path", { d: "m2 2 20 20" }],
      ["path", { d: "M22 16V6a2 2 0 0 0-2-2H10" }]
    ]
  ];

  const Touchpad = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
      ["path", { d: "M2 14h20" }],
      ["path", { d: "M12 20v-6" }]
    ]
  ];

  const TowerControl = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z"
        }
      ],
      ["path", { d: "M8 13v9" }],
      ["path", { d: "M16 22v-9" }],
      ["path", { d: "m9 6 1 7" }],
      ["path", { d: "m15 6-1 7" }],
      ["path", { d: "M12 6V2" }],
      ["path", { d: "M13 2h-2" }]
    ]
  ];

  const ToyBrick = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "12", x: "3", y: "8", rx: "1" }],
      ["path", { d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" }],
      ["path", { d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" }]
    ]
  ];

  const Train = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2" }],
      ["path", { d: "M4 11h16" }],
      ["path", { d: "M12 3v8" }],
      ["path", { d: "m8 19-2 3" }],
      ["path", { d: "m18 22-2-3" }],
      ["path", { d: "M8 15h0" }],
      ["path", { d: "M16 15h0" }]
    ]
  ];

  const Trash2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
      ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }],
      ["line", { x1: "10", x2: "10", y1: "11", y2: "17" }],
      ["line", { x1: "14", x2: "14", y1: "11", y2: "17" }]
    ]
  ];

  const Trash = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
      ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }]
    ]
  ];

  const TreeDeciduous = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M8 19h8a4 4 0 0 0 3.8-2.8 4 4 0 0 0-1.6-4.5c1-1.1 1-2.7.4-4-.7-1.2-2.2-2-3.6-1.7a3 3 0 0 0-3-3 3 3 0 0 0-3 3c-1.4-.2-2.9.5-3.6 1.7-.7 1.3-.5 2.9.4 4a4 4 0 0 0-1.6 4.5A4 4 0 0 0 8 19Z"
        }
      ],
      ["path", { d: "M12 19v3" }]
    ]
  ];

  const TreePine = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
        }
      ],
      ["path", { d: "M12 22v-3" }]
    ]
  ];

  const Trees = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"
        }
      ],
      ["path", { d: "M7 16v6" }],
      ["path", { d: "M13 19v3" }],
      [
        "path",
        {
          d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
        }
      ]
    ]
  ];

  const Trello = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["rect", { width: "3", height: "9", x: "7", y: "7" }],
      ["rect", { width: "3", height: "5", x: "14", y: "7" }]
    ]
  ];

  const TrendingDown = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }],
      ["polyline", { points: "16 17 22 17 22 11" }]
    ]
  ];

  const TrendingUp = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }],
      ["polyline", { points: "16 7 22 7 22 13" }]
    ]
  ];

  const TriangleRight = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"
        }
      ]
    ]
  ];

  const Triangle = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
        }
      ]
    ]
  ];

  const Trophy = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }],
      ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }],
      ["path", { d: "M4 22h16" }],
      [
        "path",
        { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }
      ],
      [
        "path",
        { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }
      ],
      ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" }]
    ]
  ];

  const Truck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 17h4V5H2v12h3" }],
      ["path", { d: "M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" }],
      ["path", { d: "M14 17h1" }],
      ["circle", { cx: "7.5", cy: "17.5", r: "2.5" }],
      ["circle", { cx: "17.5", cy: "17.5", r: "2.5" }]
    ]
  ];

  const Tv2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M7 21h10" }],
      ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }]
    ]
  ];

  const Tv = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", ry: "2" }],
      ["polyline", { points: "17 2 12 7 7 2" }]
    ]
  ];

  const Twitch = [
    "svg",
    defaultAttributes,
    [["path", { d: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" }]]
  ];

  const Twitter = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
        }
      ]
    ]
  ];

  const Type = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "4 7 4 4 20 4 20 7" }],
      ["line", { x1: "9", x2: "15", y1: "20", y2: "20" }],
      ["line", { x1: "12", x2: "12", y1: "4", y2: "20" }]
    ]
  ];

  const Umbrella = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M22 12a10.06 10.06 1 0 0-20 0Z" }],
      ["path", { d: "M12 12v8a2 2 0 0 0 4 0" }],
      ["path", { d: "M12 2v1" }]
    ]
  ];

  const Underline = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4" }],
      ["line", { x1: "4", x2: "20", y1: "20", y2: "20" }]
    ]
  ];

  const Undo2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M9 14 4 9l5-5" }],
      [
        "path",
        { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" }
      ]
    ]
  ];

  const UndoDot = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "17", r: "1" }],
      ["path", { d: "M3 7v6h6" }],
      ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }]
    ]
  ];

  const Undo = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 7v6h6" }],
      ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }]
    ]
  ];

  const UnfoldHorizontal = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 12h6" }],
      ["path", { d: "M8 12H2" }],
      ["path", { d: "M12 2v2" }],
      ["path", { d: "M12 8v2" }],
      ["path", { d: "M12 14v2" }],
      ["path", { d: "M12 20v2" }],
      ["path", { d: "m19 15 3-3-3-3" }],
      ["path", { d: "m5 9-3 3 3 3" }]
    ]
  ];

  const UnfoldVertical = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 22v-6" }],
      ["path", { d: "M12 8V2" }],
      ["path", { d: "M4 12H2" }],
      ["path", { d: "M10 12H8" }],
      ["path", { d: "M16 12h-2" }],
      ["path", { d: "M22 12h-2" }],
      ["path", { d: "m15 19-3 3-3-3" }],
      ["path", { d: "m15 5-3-3-3 3" }]
    ]
  ];

  const Ungroup = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "6", x: "5", y: "4", rx: "1" }],
      ["rect", { width: "8", height: "6", x: "11", y: "14", rx: "1" }]
    ]
  ];

  const Unlink2 = [
    "svg",
    defaultAttributes,
    [["path", { d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" }]]
  ];

  const Unlink = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"
        }
      ],
      [
        "path",
        {
          d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"
        }
      ],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "5" }],
      ["line", { x1: "2", x2: "5", y1: "8", y2: "8" }],
      ["line", { x1: "16", x2: "16", y1: "19", y2: "22" }],
      ["line", { x1: "19", x2: "22", y1: "16", y2: "16" }]
    ]
  ];

  const Unlock = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
      ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1" }]
    ]
  ];

  const Unplug = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m19 5 3-3" }],
      ["path", { d: "m2 22 3-3" }],
      [
        "path",
        {
          d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
        }
      ],
      ["path", { d: "M7.5 13.5 10 11" }],
      ["path", { d: "M10.5 16.5 13 14" }],
      [
        "path",
        {
          d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"
        }
      ]
    ]
  ];

  const UploadCloud = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
      ["path", { d: "M12 12v9" }],
      ["path", { d: "m16 16-4-4-4 4" }]
    ]
  ];

  const Upload = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
      ["polyline", { points: "17 8 12 3 7 8" }],
      ["line", { x1: "12", x2: "12", y1: "3", y2: "15" }]
    ]
  ];

  const Usb = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "10", cy: "7", r: "1" }],
      ["circle", { cx: "4", cy: "20", r: "1" }],
      ["path", { d: "M4.7 19.3 19 5" }],
      ["path", { d: "m21 3-3 1 2 2Z" }],
      ["path", { d: "M9.26 7.68 5 12l2 5" }],
      ["path", { d: "m10 14 5 2 3.5-3.5" }],
      ["path", { d: "m18 12 1-1 1 1-1 1Z" }]
    ]
  ];

  const User2 = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "8", r: "5" }],
      ["path", { d: "M20 21a8 8 0 1 0-16 0" }]
    ]
  ];

  const UserCheck2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 19a6 6 0 0 0-12 0" }],
      ["circle", { cx: "8", cy: "9", r: "4" }],
      ["polyline", { points: "16 11 18 13 22 9" }]
    ]
  ];

  const UserCheck = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["polyline", { points: "16 11 18 13 22 9" }]
    ]
  ];

  const UserCircle2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 20a6 6 0 0 0-12 0" }],
      ["circle", { cx: "12", cy: "10", r: "4" }],
      ["circle", { cx: "12", cy: "12", r: "10" }]
    ]
  ];

  const UserCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["circle", { cx: "12", cy: "10", r: "3" }],
      ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" }]
    ]
  ];

  const UserCog2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 19a6 6 0 0 0-12 0" }],
      ["circle", { cx: "8", cy: "9", r: "4" }],
      ["circle", { cx: "19", cy: "11", r: "2" }],
      ["path", { d: "M19 8v1" }],
      ["path", { d: "M19 13v1" }],
      ["path", { d: "m21.6 9.5-.87.5" }],
      ["path", { d: "m17.27 12-.87.5" }],
      ["path", { d: "m21.6 12.5-.87-.5" }],
      ["path", { d: "m17.27 10-.87-.5" }]
    ]
  ];

  const UserCog = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["circle", { cx: "19", cy: "11", r: "2" }],
      ["path", { d: "M19 8v1" }],
      ["path", { d: "M19 13v1" }],
      ["path", { d: "m21.6 9.5-.87.5" }],
      ["path", { d: "m17.27 12-.87.5" }],
      ["path", { d: "m21.6 12.5-.87-.5" }],
      ["path", { d: "m17.27 10-.87-.5" }]
    ]
  ];

  const UserMinus2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 19a6 6 0 0 0-12 0" }],
      ["circle", { cx: "8", cy: "9", r: "4" }],
      ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
    ]
  ];

  const UserMinus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
    ]
  ];

  const UserPlus2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 19a6 6 0 0 0-12 0" }],
      ["circle", { cx: "8", cy: "9", r: "4" }],
      ["line", { x1: "19", x2: "19", y1: "8", y2: "14" }],
      ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
    ]
  ];

  const UserPlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["line", { x1: "19", x2: "19", y1: "8", y2: "14" }],
      ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
    ]
  ];

  const UserSquare2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 21a6 6 0 0 0-12 0" }],
      ["circle", { cx: "12", cy: "11", r: "4" }],
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
    ]
  ];

  const UserSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["circle", { cx: "12", cy: "10", r: "3" }],
      ["path", { d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" }]
    ]
  ];

  const UserX2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 19a6 6 0 0 0-12 0" }],
      ["circle", { cx: "8", cy: "9", r: "4" }],
      ["line", { x1: "17", x2: "22", y1: "8", y2: "13" }],
      ["line", { x1: "22", x2: "17", y1: "8", y2: "13" }]
    ]
  ];

  const UserX = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["line", { x1: "17", x2: "22", y1: "8", y2: "13" }],
      ["line", { x1: "22", x2: "17", y1: "8", y2: "13" }]
    ]
  ];

  const User = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "12", cy: "7", r: "4" }]
    ]
  ];

  const Users2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M14 19a6 6 0 0 0-12 0" }],
      ["circle", { cx: "8", cy: "9", r: "4" }],
      ["path", { d: "M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" }]
    ]
  ];

  const Users = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
      ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }]
    ]
  ];

  const UtensilsCrossed = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" }
      ],
      [
        "path",
        {
          d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"
        }
      ],
      ["path", { d: "m2.1 21.8 6.4-6.3" }],
      ["path", { d: "m19 5-7 7" }]
    ]
  ];

  const Utensils = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" }],
      ["path", { d: "M7 2v20" }],
      ["path", { d: "M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" }]
    ]
  ];

  const UtilityPole = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v20" }],
      ["path", { d: "M2 5h20" }],
      ["path", { d: "M3 3v2" }],
      ["path", { d: "M7 3v2" }],
      ["path", { d: "M17 3v2" }],
      ["path", { d: "M21 3v2" }],
      ["path", { d: "m19 5-7 7-7-7" }]
    ]
  ];

  const Variable = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 21s-4-3-4-9 4-9 4-9" }],
      ["path", { d: "M16 3s4 3 4 9-4 9-4 9" }],
      ["line", { x1: "15", x2: "9", y1: "9", y2: "15" }],
      ["line", { x1: "9", x2: "15", y1: "9", y2: "15" }]
    ]
  ];

  const Vegan = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" }],
      ["path", { d: "M16 8c4 0 6-2 6-6-4 0-6 2-6 6" }],
      ["path", { d: "M17.41 3.6a10 10 0 1 0 3 3" }]
    ]
  ];

  const VenetianMask = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"
        }
      ],
      ["path", { d: "M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" }],
      ["path", { d: "M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" }]
    ]
  ];

  const VibrateOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 8 2 2-2 2 2 2-2 2" }],
      ["path", { d: "m22 8-2 2 2 2-2 2 2 2" }],
      ["path", { d: "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2" }],
      ["path", { d: "M16 10.34V6c0-.55-.45-1-1-1h-4.34" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Vibrate = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 8 2 2-2 2 2 2-2 2" }],
      ["path", { d: "m22 8-2 2 2 2-2 2 2 2" }],
      ["rect", { width: "8", height: "14", x: "8", y: "5", rx: "1" }]
    ]
  ];

  const VideoOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8" }],
      [
        "path",
        { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z" }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Video = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m22 8-6 4 6 4V8Z" }],
      ["rect", { width: "14", height: "12", x: "2", y: "6", rx: "2", ry: "2" }]
    ]
  ];

  const Videotape = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
      ["path", { d: "M2 8h20" }],
      ["circle", { cx: "8", cy: "14", r: "2" }],
      ["path", { d: "M8 12h8" }],
      ["circle", { cx: "16", cy: "14", r: "2" }]
    ]
  ];

  const View = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        { d: "M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" }
      ],
      ["path", { d: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" }],
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" }],
      ["path", { d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" }]
    ]
  ];

  const Voicemail = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "6", cy: "12", r: "4" }],
      ["circle", { cx: "18", cy: "12", r: "4" }],
      ["line", { x1: "6", x2: "18", y1: "16", y2: "16" }]
    ]
  ];

  const Volume1 = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }],
      ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }]
    ]
  ];

  const Volume2 = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }],
      ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }],
      ["path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" }]
    ]
  ];

  const VolumeX = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }],
      ["line", { x1: "22", x2: "16", y1: "9", y2: "15" }],
      ["line", { x1: "16", x2: "22", y1: "9", y2: "15" }]
    ]
  ];

  const Volume = [
    "svg",
    defaultAttributes,
    [["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }]]
  ];

  const Vote = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m9 12 2 2 4-4" }],
      ["path", { d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" }],
      ["path", { d: "M22 19H2" }]
    ]
  ];

  const Wallet2 = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17 14h.01" }],
      [
        "path",
        {
          d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"
        }
      ]
    ]
  ];

  const WalletCards = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" }],
      [
        "path",
        {
          d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21"
        }
      ]
    ]
  ];

  const Wallet = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 12V7H5a2 2 0 0 1 0-4h14v4" }],
      ["path", { d: "M3 5v14a2 2 0 0 0 2 2h16v-5" }],
      ["path", { d: "M18 12a2 2 0 0 0 0 4h4v-4Z" }]
    ]
  ];

  const Wallpaper = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "8", cy: "9", r: "2" }],
      [
        "path",
        {
          d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"
        }
      ],
      ["path", { d: "M8 21h8" }],
      ["path", { d: "M12 17v4" }]
    ]
  ];

  const Wand2 = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"
        }
      ],
      ["path", { d: "m14 7 3 3" }],
      ["path", { d: "M5 6v4" }],
      ["path", { d: "M19 14v4" }],
      ["path", { d: "M10 2v2" }],
      ["path", { d: "M7 8H3" }],
      ["path", { d: "M21 16h-4" }],
      ["path", { d: "M11 3H9" }]
    ]
  ];

  const Wand = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 4V2" }],
      ["path", { d: "M15 16v-2" }],
      ["path", { d: "M8 9h2" }],
      ["path", { d: "M20 9h2" }],
      ["path", { d: "M17.8 11.8 19 13" }],
      ["path", { d: "M15 9h0" }],
      ["path", { d: "M17.8 6.2 19 5" }],
      ["path", { d: "m3 21 9-9" }],
      ["path", { d: "M12.2 6.2 11 5" }]
    ]
  ];

  const Warehouse = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"
        }
      ],
      ["path", { d: "M6 18h12" }],
      ["path", { d: "M6 14h12" }],
      ["rect", { width: "12", height: "12", x: "6", y: "10" }]
    ]
  ];

  const Watch = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "6" }],
      ["polyline", { points: "12 10 12 12 13 13" }],
      [
        "path",
        {
          d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"
        }
      ],
      [
        "path",
        { d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" }
      ]
    ]
  ];

  const Waves = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        }
      ],
      [
        "path",
        {
          d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        }
      ],
      [
        "path",
        {
          d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        }
      ]
    ]
  ];

  const Webcam = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "10", r: "8" }],
      ["circle", { cx: "12", cy: "10", r: "3" }],
      ["path", { d: "M7 22h10" }],
      ["path", { d: "M12 22v-4" }]
    ]
  ];

  const Webhook = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"
        }
      ],
      [
        "path",
        { d: "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" }
      ],
      ["path", { d: "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" }]
    ]
  ];

  const WheatOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m2 22 10-10" }],
      ["path", { d: "m16 8-1.17 1.17" }],
      [
        "path",
        {
          d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
        }
      ],
      [
        "path",
        {
          d: "m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"
        }
      ],
      [
        "path",
        {
          d: "M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"
        }
      ],
      ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
      [
        "path",
        {
          d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
        }
      ],
      [
        "path",
        {
          d: "m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"
        }
      ],
      [
        "path",
        {
          d: "M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Wheat = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 22 16 8" }],
      [
        "path",
        {
          d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
        }
      ],
      [
        "path",
        {
          d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
        }
      ],
      [
        "path",
        {
          d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
        }
      ],
      ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
      [
        "path",
        {
          d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
        }
      ],
      [
        "path",
        {
          d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
        }
      ],
      [
        "path",
        {
          d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
        }
      ]
    ]
  ];

  const WholeWord = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "7", cy: "12", r: "3" }],
      ["path", { d: "M10 9v6" }],
      ["circle", { cx: "17", cy: "12", r: "3" }],
      ["path", { d: "M14 7v8" }],
      ["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }]
    ]
  ];

  const WifiOff = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
      ["path", { d: "M8.5 16.5a5 5 0 0 1 7 0" }],
      ["path", { d: "M2 8.82a15 15 0 0 1 4.17-2.65" }],
      ["path", { d: "M10.66 5c4.01-.36 8.14.9 11.34 3.76" }],
      ["path", { d: "M16.85 11.25a10 10 0 0 1 2.22 1.68" }],
      ["path", { d: "M5 13a10 10 0 0 1 5.24-2.76" }],
      ["line", { x1: "12", x2: "12.01", y1: "20", y2: "20" }]
    ]
  ];

  const Wifi = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 13a10 10 0 0 1 14 0" }],
      ["path", { d: "M8.5 16.5a5 5 0 0 1 7 0" }],
      ["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
      ["line", { x1: "12", x2: "12.01", y1: "20", y2: "20" }]
    ]
  ];

  const Wind = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" }],
      ["path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2" }],
      ["path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2" }]
    ]
  ];

  const WineOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 22h8" }],
      ["path", { d: "M7 10h3m7 0h-1.343" }],
      ["path", { d: "M12 15v7" }],
      [
        "path",
        {
          d: "M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"
        }
      ],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Wine = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 22h8" }],
      ["path", { d: "M7 10h10" }],
      ["path", { d: "M12 15v7" }],
      [
        "path",
        {
          d: "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"
        }
      ]
    ]
  ];

  const Workflow = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4" }],
      ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2" }]
    ]
  ];

  const WrapText = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "3", x2: "21", y1: "6", y2: "6" }],
      ["path", { d: "M3 12h15a3 3 0 1 1 0 6h-4" }],
      ["polyline", { points: "16 16 14 18 16 20" }],
      ["line", { x1: "3", x2: "10", y1: "18", y2: "18" }]
    ]
  ];

  const Wrench = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        }
      ]
    ]
  ];

  const XCircle = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m15 9-6 6" }],
      ["path", { d: "m9 9 6 6" }]
    ]
  ];

  const XOctagon = [
    "svg",
    defaultAttributes,
    [
      [
        "polygon",
        {
          points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
        }
      ],
      ["path", { d: "m15 9-6 6" }],
      ["path", { d: "m9 9 6 6" }]
    ]
  ];

  const XSquare = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["path", { d: "m15 9-6 6" }],
      ["path", { d: "m9 9 6 6" }]
    ]
  ];

  const X = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }]
    ]
  ];

  const Youtube = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
        }
      ],
      ["path", { d: "m10 15 5-3-5-3z" }]
    ]
  ];

  const ZapOff = [
    "svg",
    defaultAttributes,
    [
      ["polyline", { points: "12.41 6.75 13 2 10.57 4.92" }],
      ["polyline", { points: "18.57 12.91 21 10 15.66 10" }],
      ["polyline", { points: "8 8 3 14 12 14 11 22 16 16" }],
      ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
    ]
  ];

  const Zap = [
    "svg",
    defaultAttributes,
    [["polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }]]
  ];

  const ZoomIn = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
      ["line", { x1: "11", x2: "11", y1: "8", y2: "14" }],
      ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
    ]
  ];

  const ZoomOut = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
      ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
    ]
  ];

  var allIcons = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Accessibility: Accessibility,
    Activity: Activity,
    ActivitySquare: ActivitySquare,
    AirVent: AirVent,
    Airplay: Airplay,
    AlarmCheck: AlarmCheck,
    AlarmClock: AlarmClock,
    AlarmClockOff: AlarmClockOff,
    AlarmMinus: AlarmMinus,
    AlarmPlus: AlarmPlus,
    Album: Album,
    AlertCircle: AlertCircle,
    AlertOctagon: AlertOctagon,
    AlertTriangle: AlertTriangle,
    AlignCenter: AlignCenter,
    AlignCenterHorizontal: AlignCenterHorizontal,
    AlignCenterVertical: AlignCenterVertical,
    AlignEndHorizontal: AlignEndHorizontal,
    AlignEndVertical: AlignEndVertical,
    AlignHorizontalDistributeCenter: AlignHorizontalDistributeCenter,
    AlignHorizontalDistributeEnd: AlignHorizontalDistributeEnd,
    AlignHorizontalDistributeStart: AlignHorizontalDistributeStart,
    AlignHorizontalJustifyCenter: AlignHorizontalJustifyCenter,
    AlignHorizontalJustifyEnd: AlignHorizontalJustifyEnd,
    AlignHorizontalJustifyStart: AlignHorizontalJustifyStart,
    AlignHorizontalSpaceAround: AlignHorizontalSpaceAround,
    AlignHorizontalSpaceBetween: AlignHorizontalSpaceBetween,
    AlignJustify: AlignJustify,
    AlignLeft: AlignLeft,
    AlignRight: AlignRight,
    AlignStartHorizontal: AlignStartHorizontal,
    AlignStartVertical: AlignStartVertical,
    AlignVerticalDistributeCenter: AlignVerticalDistributeCenter,
    AlignVerticalDistributeEnd: AlignVerticalDistributeEnd,
    AlignVerticalDistributeStart: AlignVerticalDistributeStart,
    AlignVerticalJustifyCenter: AlignVerticalJustifyCenter,
    AlignVerticalJustifyEnd: AlignVerticalJustifyEnd,
    AlignVerticalJustifyStart: AlignVerticalJustifyStart,
    AlignVerticalSpaceAround: AlignVerticalSpaceAround,
    AlignVerticalSpaceBetween: AlignVerticalSpaceBetween,
    Ampersand: Ampersand,
    Ampersands: Ampersands,
    Anchor: Anchor,
    Angry: Angry,
    Annoyed: Annoyed,
    Antenna: Antenna,
    Aperture: Aperture,
    AppWindow: AppWindow,
    Apple: Apple,
    Archive: Archive,
    ArchiveRestore: ArchiveRestore,
    AreaChart: AreaChart,
    Armchair: Armchair,
    ArrowBigDown: ArrowBigDown,
    ArrowBigDownDash: ArrowBigDownDash,
    ArrowBigLeft: ArrowBigLeft,
    ArrowBigLeftDash: ArrowBigLeftDash,
    ArrowBigRight: ArrowBigRight,
    ArrowBigRightDash: ArrowBigRightDash,
    ArrowBigUp: ArrowBigUp,
    ArrowBigUpDash: ArrowBigUpDash,
    ArrowDown: ArrowDown,
    ArrowDown01: ArrowDown01,
    ArrowDown10: ArrowDown10,
    ArrowDownAZ: ArrowDownAZ,
    ArrowDownCircle: ArrowDownCircle,
    ArrowDownFromLine: ArrowDownFromLine,
    ArrowDownLeft: ArrowDownLeft,
    ArrowDownLeftFromCircle: ArrowDownLeftFromCircle,
    ArrowDownLeftSquare: ArrowDownLeftSquare,
    ArrowDownNarrowWide: ArrowDownNarrowWide,
    ArrowDownRight: ArrowDownRight,
    ArrowDownRightFromCircle: ArrowDownRightFromCircle,
    ArrowDownRightSquare: ArrowDownRightSquare,
    ArrowDownSquare: ArrowDownSquare,
    ArrowDownToDot: ArrowDownToDot,
    ArrowDownToLine: ArrowDownToLine,
    ArrowDownUp: ArrowDownUp,
    ArrowDownWideNarrow: ArrowDownWideNarrow,
    ArrowDownZA: ArrowDownZA,
    ArrowLeft: ArrowLeft,
    ArrowLeftCircle: ArrowLeftCircle,
    ArrowLeftFromLine: ArrowLeftFromLine,
    ArrowLeftRight: ArrowLeftRight,
    ArrowLeftSquare: ArrowLeftSquare,
    ArrowLeftToLine: ArrowLeftToLine,
    ArrowRight: ArrowRight,
    ArrowRightCircle: ArrowRightCircle,
    ArrowRightFromLine: ArrowRightFromLine,
    ArrowRightLeft: ArrowRightLeft,
    ArrowRightSquare: ArrowRightSquare,
    ArrowRightToLine: ArrowRightToLine,
    ArrowUp: ArrowUp,
    ArrowUp01: ArrowUp01,
    ArrowUp10: ArrowUp10,
    ArrowUpAZ: ArrowUpAZ,
    ArrowUpCircle: ArrowUpCircle,
    ArrowUpDown: ArrowUpDown,
    ArrowUpFromDot: ArrowUpFromDot,
    ArrowUpFromLine: ArrowUpFromLine,
    ArrowUpLeft: ArrowUpLeft,
    ArrowUpLeftFromCircle: ArrowUpLeftFromCircle,
    ArrowUpLeftSquare: ArrowUpLeftSquare,
    ArrowUpNarrowWide: ArrowUpNarrowWide,
    ArrowUpRight: ArrowUpRight,
    ArrowUpRightFromCircle: ArrowUpRightFromCircle,
    ArrowUpRightSquare: ArrowUpRightSquare,
    ArrowUpSquare: ArrowUpSquare,
    ArrowUpToLine: ArrowUpToLine,
    ArrowUpWideNarrow: ArrowUpWideNarrow,
    ArrowUpZA: ArrowUpZA,
    ArrowsUpFromLine: ArrowsUpFromLine,
    Asterisk: Asterisk,
    AtSign: AtSign,
    Atom: Atom,
    Award: Award,
    Axe: Axe,
    Axis3d: Axis3d,
    Baby: Baby,
    Backpack: Backpack,
    Badge: Badge,
    BadgeAlert: BadgeAlert,
    BadgeCheck: BadgeCheck,
    BadgeDollarSign: BadgeDollarSign,
    BadgeHelp: BadgeHelp,
    BadgeInfo: BadgeInfo,
    BadgeMinus: BadgeMinus,
    BadgePercent: BadgePercent,
    BadgePlus: BadgePlus,
    BadgeX: BadgeX,
    BaggageClaim: BaggageClaim,
    Ban: Ban,
    Banana: Banana,
    Banknote: Banknote,
    BarChart: BarChart,
    BarChart2: BarChart2,
    BarChart3: BarChart3,
    BarChart4: BarChart4,
    BarChartBig: BarChartBig,
    BarChartHorizontal: BarChartHorizontal,
    BarChartHorizontalBig: BarChartHorizontalBig,
    Baseline: Baseline,
    Bath: Bath,
    Battery: Battery,
    BatteryCharging: BatteryCharging,
    BatteryFull: BatteryFull,
    BatteryLow: BatteryLow,
    BatteryMedium: BatteryMedium,
    BatteryWarning: BatteryWarning,
    Beaker: Beaker,
    Bean: Bean,
    BeanOff: BeanOff,
    Bed: Bed,
    BedDouble: BedDouble,
    BedSingle: BedSingle,
    Beef: Beef,
    Beer: Beer,
    Bell: Bell,
    BellDot: BellDot,
    BellMinus: BellMinus,
    BellOff: BellOff,
    BellPlus: BellPlus,
    BellRing: BellRing,
    Bike: Bike,
    Binary: Binary,
    Biohazard: Biohazard,
    Bird: Bird,
    Bitcoin: Bitcoin,
    Blinds: Blinds,
    Bluetooth: Bluetooth,
    BluetoothConnected: BluetoothConnected,
    BluetoothOff: BluetoothOff,
    BluetoothSearching: BluetoothSearching,
    Bold: Bold,
    Bomb: Bomb,
    Bone: Bone,
    Book: Book,
    BookCopy: BookCopy,
    BookDown: BookDown,
    BookKey: BookKey,
    BookLock: BookLock,
    BookMarked: BookMarked,
    BookMinus: BookMinus,
    BookOpen: BookOpen,
    BookOpenCheck: BookOpenCheck,
    BookPlus: BookPlus,
    BookTemplate: BookTemplate,
    BookUp: BookUp,
    BookUp2: BookUp2,
    BookX: BookX,
    Bookmark: Bookmark,
    BookmarkMinus: BookmarkMinus,
    BookmarkPlus: BookmarkPlus,
    BoomBox: BoomBox,
    Bot: Bot,
    Box: Box,
    BoxSelect: BoxSelect,
    Boxes: Boxes,
    Braces: Braces,
    Brackets: Brackets,
    Brain: Brain,
    BrainCircuit: BrainCircuit,
    BrainCog: BrainCog,
    Briefcase: Briefcase,
    BringToFront: BringToFront,
    Brush: Brush,
    Bug: Bug,
    Building: Building,
    Building2: Building2,
    Bus: Bus,
    Cable: Cable,
    Cake: Cake,
    CakeSlice: CakeSlice,
    Calculator: Calculator,
    Calendar: Calendar,
    CalendarCheck: CalendarCheck,
    CalendarCheck2: CalendarCheck2,
    CalendarClock: CalendarClock,
    CalendarDays: CalendarDays,
    CalendarHeart: CalendarHeart,
    CalendarMinus: CalendarMinus,
    CalendarOff: CalendarOff,
    CalendarPlus: CalendarPlus,
    CalendarRange: CalendarRange,
    CalendarSearch: CalendarSearch,
    CalendarX: CalendarX,
    CalendarX2: CalendarX2,
    Camera: Camera,
    CameraOff: CameraOff,
    CandlestickChart: CandlestickChart,
    Candy: Candy,
    CandyCane: CandyCane,
    CandyOff: CandyOff,
    Car: Car,
    Carrot: Carrot,
    CaseLower: CaseLower,
    CaseSensitive: CaseSensitive,
    CaseUpper: CaseUpper,
    CassetteTape: CassetteTape,
    Cast: Cast,
    Castle: Castle,
    Cat: Cat,
    Check: Check,
    CheckCheck: CheckCheck,
    CheckCircle: CheckCircle,
    CheckCircle2: CheckCircle2,
    CheckSquare: CheckSquare,
    ChefHat: ChefHat,
    Cherry: Cherry,
    ChevronDown: ChevronDown,
    ChevronDownCircle: ChevronDownCircle,
    ChevronDownSquare: ChevronDownSquare,
    ChevronFirst: ChevronFirst,
    ChevronLast: ChevronLast,
    ChevronLeft: ChevronLeft,
    ChevronLeftCircle: ChevronLeftCircle,
    ChevronLeftSquare: ChevronLeftSquare,
    ChevronRight: ChevronRight,
    ChevronRightCircle: ChevronRightCircle,
    ChevronRightSquare: ChevronRightSquare,
    ChevronUp: ChevronUp,
    ChevronUpCircle: ChevronUpCircle,
    ChevronUpSquare: ChevronUpSquare,
    ChevronsDown: ChevronsDown,
    ChevronsDownUp: ChevronsDownUp,
    ChevronsLeft: ChevronsLeft,
    ChevronsLeftRight: ChevronsLeftRight,
    ChevronsRight: ChevronsRight,
    ChevronsRightLeft: ChevronsRightLeft,
    ChevronsUp: ChevronsUp,
    ChevronsUpDown: ChevronsUpDown,
    Chrome: Chrome,
    Church: Church,
    Cigarette: Cigarette,
    CigaretteOff: CigaretteOff,
    Circle: Circle,
    CircleDashed: CircleDashed,
    CircleDollarSign: CircleDollarSign,
    CircleDot: CircleDot,
    CircleDotDashed: CircleDotDashed,
    CircleEllipsis: CircleEllipsis,
    CircleEqual: CircleEqual,
    CircleOff: CircleOff,
    CircleSlash: CircleSlash,
    CircleSlash2: CircleSlash2,
    CircuitBoard: CircuitBoard,
    Citrus: Citrus,
    Clapperboard: Clapperboard,
    Clipboard: Clipboard,
    ClipboardCheck: ClipboardCheck,
    ClipboardCopy: ClipboardCopy,
    ClipboardEdit: ClipboardEdit,
    ClipboardList: ClipboardList,
    ClipboardPaste: ClipboardPaste,
    ClipboardSignature: ClipboardSignature,
    ClipboardType: ClipboardType,
    ClipboardX: ClipboardX,
    Clock: Clock,
    Clock1: Clock1,
    Clock10: Clock10,
    Clock11: Clock11,
    Clock12: Clock12,
    Clock2: Clock2,
    Clock3: Clock3,
    Clock4: Clock4,
    Clock5: Clock5,
    Clock6: Clock6,
    Clock7: Clock7,
    Clock8: Clock8,
    Clock9: Clock9,
    Cloud: Cloud,
    CloudCog: CloudCog,
    CloudDrizzle: CloudDrizzle,
    CloudFog: CloudFog,
    CloudHail: CloudHail,
    CloudLightning: CloudLightning,
    CloudMoon: CloudMoon,
    CloudMoonRain: CloudMoonRain,
    CloudOff: CloudOff,
    CloudRain: CloudRain,
    CloudRainWind: CloudRainWind,
    CloudSnow: CloudSnow,
    CloudSun: CloudSun,
    CloudSunRain: CloudSunRain,
    Cloudy: Cloudy,
    Clover: Clover,
    Club: Club,
    Code: Code,
    Code2: Code2,
    Codepen: Codepen,
    Codesandbox: Codesandbox,
    Coffee: Coffee,
    Cog: Cog,
    Coins: Coins,
    Columns: Columns,
    Combine: Combine,
    Command: Command,
    Compass: Compass,
    Component: Component,
    Computer: Computer,
    ConciergeBell: ConciergeBell,
    Construction: Construction,
    Contact: Contact,
    Contact2: Contact2,
    Container: Container,
    Contrast: Contrast,
    Cookie: Cookie,
    Copy: Copy,
    CopyCheck: CopyCheck,
    CopyMinus: CopyMinus,
    CopyPlus: CopyPlus,
    CopySlash: CopySlash,
    CopyX: CopyX,
    Copyleft: Copyleft,
    Copyright: Copyright,
    CornerDownLeft: CornerDownLeft,
    CornerDownRight: CornerDownRight,
    CornerLeftDown: CornerLeftDown,
    CornerLeftUp: CornerLeftUp,
    CornerRightDown: CornerRightDown,
    CornerRightUp: CornerRightUp,
    CornerUpLeft: CornerUpLeft,
    CornerUpRight: CornerUpRight,
    Cpu: Cpu,
    CreativeCommons: CreativeCommons,
    CreditCard: CreditCard,
    Croissant: Croissant,
    Crop: Crop,
    Cross: Cross,
    Crosshair: Crosshair,
    Crown: Crown,
    CupSoda: CupSoda,
    Currency: Currency,
    Database: Database,
    DatabaseBackup: DatabaseBackup,
    Delete: Delete,
    Dessert: Dessert,
    Diamond: Diamond,
    Dice1: Dice1,
    Dice2: Dice2,
    Dice3: Dice3,
    Dice4: Dice4,
    Dice5: Dice5,
    Dice6: Dice6,
    Dices: Dices,
    Diff: Diff,
    Disc: Disc,
    Disc2: Disc2,
    Disc3: Disc3,
    Divide: Divide,
    DivideCircle: DivideCircle,
    DivideSquare: DivideSquare,
    Dna: Dna,
    DnaOff: DnaOff,
    Dog: Dog,
    DollarSign: DollarSign,
    Donut: Donut,
    DoorClosed: DoorClosed,
    DoorOpen: DoorOpen,
    Dot: Dot,
    Download: Download,
    DownloadCloud: DownloadCloud,
    Dribbble: Dribbble,
    Droplet: Droplet,
    Droplets: Droplets,
    Drumstick: Drumstick,
    Dumbbell: Dumbbell,
    Ear: Ear,
    EarOff: EarOff,
    Egg: Egg,
    EggFried: EggFried,
    EggOff: EggOff,
    Equal: Equal,
    EqualNot: EqualNot,
    Eraser: Eraser,
    Euro: Euro,
    Expand: Expand,
    ExternalLink: ExternalLink,
    Eye: Eye,
    EyeOff: EyeOff,
    Facebook: Facebook,
    Factory: Factory,
    Fan: Fan,
    FastForward: FastForward,
    Feather: Feather,
    FerrisWheel: FerrisWheel,
    Figma: Figma,
    File: File,
    FileArchive: FileArchive,
    FileAudio: FileAudio,
    FileAudio2: FileAudio2,
    FileAxis3d: FileAxis3d,
    FileBadge: FileBadge,
    FileBadge2: FileBadge2,
    FileBarChart: FileBarChart,
    FileBarChart2: FileBarChart2,
    FileBox: FileBox,
    FileCheck: FileCheck,
    FileCheck2: FileCheck2,
    FileClock: FileClock,
    FileCode: FileCode,
    FileCode2: FileCode2,
    FileCog: FileCog,
    FileCog2: FileCog2,
    FileDiff: FileDiff,
    FileDigit: FileDigit,
    FileDown: FileDown,
    FileEdit: FileEdit,
    FileHeart: FileHeart,
    FileImage: FileImage,
    FileInput: FileInput,
    FileJson: FileJson,
    FileJson2: FileJson2,
    FileKey: FileKey,
    FileKey2: FileKey2,
    FileLineChart: FileLineChart,
    FileLock: FileLock,
    FileLock2: FileLock2,
    FileMinus: FileMinus,
    FileMinus2: FileMinus2,
    FileOutput: FileOutput,
    FilePieChart: FilePieChart,
    FilePlus: FilePlus,
    FilePlus2: FilePlus2,
    FileQuestion: FileQuestion,
    FileScan: FileScan,
    FileSearch: FileSearch,
    FileSearch2: FileSearch2,
    FileSignature: FileSignature,
    FileSpreadsheet: FileSpreadsheet,
    FileStack: FileStack,
    FileSymlink: FileSymlink,
    FileTerminal: FileTerminal,
    FileText: FileText,
    FileType: FileType,
    FileType2: FileType2,
    FileUp: FileUp,
    FileVideo: FileVideo,
    FileVideo2: FileVideo2,
    FileVolume: FileVolume,
    FileVolume2: FileVolume2,
    FileWarning: FileWarning,
    FileX: FileX,
    FileX2: FileX2,
    Files: Files,
    Film: Film,
    Filter: Filter,
    FilterX: FilterX,
    Fingerprint: Fingerprint,
    Fish: Fish,
    FishOff: FishOff,
    Flag: Flag,
    FlagOff: FlagOff,
    FlagTriangleLeft: FlagTriangleLeft,
    FlagTriangleRight: FlagTriangleRight,
    Flame: Flame,
    Flashlight: Flashlight,
    FlashlightOff: FlashlightOff,
    FlaskConical: FlaskConical,
    FlaskConicalOff: FlaskConicalOff,
    FlaskRound: FlaskRound,
    FlipHorizontal: FlipHorizontal,
    FlipHorizontal2: FlipHorizontal2,
    FlipVertical: FlipVertical,
    FlipVertical2: FlipVertical2,
    Flower: Flower,
    Flower2: Flower2,
    Focus: Focus,
    FoldHorizontal: FoldHorizontal,
    FoldVertical: FoldVertical,
    Folder: Folder,
    FolderArchive: FolderArchive,
    FolderCheck: FolderCheck,
    FolderClock: FolderClock,
    FolderClosed: FolderClosed,
    FolderCog: FolderCog,
    FolderCog2: FolderCog2,
    FolderDot: FolderDot,
    FolderDown: FolderDown,
    FolderEdit: FolderEdit,
    FolderGit: FolderGit,
    FolderGit2: FolderGit2,
    FolderHeart: FolderHeart,
    FolderInput: FolderInput,
    FolderKanban: FolderKanban,
    FolderKey: FolderKey,
    FolderLock: FolderLock,
    FolderMinus: FolderMinus,
    FolderOpen: FolderOpen,
    FolderOpenDot: FolderOpenDot,
    FolderOutput: FolderOutput,
    FolderPlus: FolderPlus,
    FolderRoot: FolderRoot,
    FolderSearch: FolderSearch,
    FolderSearch2: FolderSearch2,
    FolderSymlink: FolderSymlink,
    FolderSync: FolderSync,
    FolderTree: FolderTree,
    FolderUp: FolderUp,
    FolderX: FolderX,
    Folders: Folders,
    Footprints: Footprints,
    Forklift: Forklift,
    FormInput: FormInput,
    Forward: Forward,
    Frame: Frame,
    Framer: Framer,
    Frown: Frown,
    Fuel: Fuel,
    FunctionSquare: FunctionSquare,
    GalleryHorizontal: GalleryHorizontal,
    GalleryHorizontalEnd: GalleryHorizontalEnd,
    GalleryThumbnails: GalleryThumbnails,
    GalleryVertical: GalleryVertical,
    GalleryVerticalEnd: GalleryVerticalEnd,
    Gamepad: Gamepad,
    Gamepad2: Gamepad2,
    GanttChart: GanttChart,
    GanttChartSquare: GanttChartSquare,
    Gauge: Gauge,
    GaugeCircle: GaugeCircle,
    Gavel: Gavel,
    Gem: Gem,
    Ghost: Ghost,
    Gift: Gift,
    GitBranch: GitBranch,
    GitBranchPlus: GitBranchPlus,
    GitCommit: GitCommit,
    GitCompare: GitCompare,
    GitFork: GitFork,
    GitMerge: GitMerge,
    GitPullRequest: GitPullRequest,
    GitPullRequestClosed: GitPullRequestClosed,
    GitPullRequestDraft: GitPullRequestDraft,
    Github: Github,
    Gitlab: Gitlab,
    GlassWater: GlassWater,
    Glasses: Glasses,
    Globe: Globe,
    Globe2: Globe2,
    Goal: Goal,
    Grab: Grab,
    GraduationCap: GraduationCap,
    Grape: Grape,
    Grid: Grid,
    Grip: Grip,
    GripHorizontal: GripHorizontal,
    GripVertical: GripVertical,
    Group: Group,
    Hammer: Hammer,
    Hand: Hand,
    HandMetal: HandMetal,
    HardDrive: HardDrive,
    HardDriveDownload: HardDriveDownload,
    HardDriveUpload: HardDriveUpload,
    HardHat: HardHat,
    Hash: Hash,
    Haze: Haze,
    HdmiPort: HdmiPort,
    Heading: Heading,
    Heading1: Heading1,
    Heading2: Heading2,
    Heading3: Heading3,
    Heading4: Heading4,
    Heading5: Heading5,
    Heading6: Heading6,
    Headphones: Headphones,
    Heart: Heart,
    HeartCrack: HeartCrack,
    HeartHandshake: HeartHandshake,
    HeartOff: HeartOff,
    HeartPulse: HeartPulse,
    HelpCircle: HelpCircle,
    HelpingHand: HelpingHand,
    Hexagon: Hexagon,
    Highlighter: Highlighter,
    History: History,
    Home: Home,
    Hop: Hop,
    HopOff: HopOff,
    Hotel: Hotel,
    Hourglass: Hourglass,
    IceCream: IceCream,
    IceCream2: IceCream2,
    Image: Image,
    ImageMinus: ImageMinus,
    ImageOff: ImageOff,
    ImagePlus: ImagePlus,
    Import: Import,
    Inbox: Inbox,
    Indent: Indent,
    IndianRupee: IndianRupee,
    Infinity: Infinity,
    Info: Info,
    Inspect: Inspect,
    Instagram: Instagram,
    Italic: Italic,
    IterationCcw: IterationCcw,
    IterationCw: IterationCw,
    JapaneseYen: JapaneseYen,
    Joystick: Joystick,
    Kanban: Kanban,
    KanbanSquare: KanbanSquare,
    KanbanSquareDashed: KanbanSquareDashed,
    Key: Key,
    KeyRound: KeyRound,
    KeySquare: KeySquare,
    Keyboard: Keyboard,
    Lamp: Lamp,
    LampCeiling: LampCeiling,
    LampDesk: LampDesk,
    LampFloor: LampFloor,
    LampWallDown: LampWallDown,
    LampWallUp: LampWallUp,
    Landmark: Landmark,
    Languages: Languages,
    Laptop: Laptop,
    Laptop2: Laptop2,
    Lasso: Lasso,
    LassoSelect: LassoSelect,
    Laugh: Laugh,
    Layers: Layers,
    Layout: Layout,
    LayoutDashboard: LayoutDashboard,
    LayoutGrid: LayoutGrid,
    LayoutList: LayoutList,
    LayoutPanelLeft: LayoutPanelLeft,
    LayoutPanelTop: LayoutPanelTop,
    LayoutTemplate: LayoutTemplate,
    Leaf: Leaf,
    LeafyGreen: LeafyGreen,
    Library: Library,
    LifeBuoy: LifeBuoy,
    Ligature: Ligature,
    Lightbulb: Lightbulb,
    LightbulbOff: LightbulbOff,
    LineChart: LineChart,
    Link: Link,
    Link2: Link2,
    Link2Off: Link2Off,
    Linkedin: Linkedin,
    List: List,
    ListChecks: ListChecks,
    ListEnd: ListEnd,
    ListFilter: ListFilter,
    ListMinus: ListMinus,
    ListMusic: ListMusic,
    ListOrdered: ListOrdered,
    ListPlus: ListPlus,
    ListRestart: ListRestart,
    ListStart: ListStart,
    ListTodo: ListTodo,
    ListTree: ListTree,
    ListVideo: ListVideo,
    ListX: ListX,
    Loader: Loader,
    Loader2: Loader2,
    Locate: Locate,
    LocateFixed: LocateFixed,
    LocateOff: LocateOff,
    Lock: Lock,
    LogIn: LogIn,
    LogOut: LogOut,
    Lollipop: Lollipop,
    Luggage: Luggage,
    Magnet: Magnet,
    Mail: Mail,
    MailCheck: MailCheck,
    MailMinus: MailMinus,
    MailOpen: MailOpen,
    MailPlus: MailPlus,
    MailQuestion: MailQuestion,
    MailSearch: MailSearch,
    MailWarning: MailWarning,
    MailX: MailX,
    Mailbox: Mailbox,
    Mails: Mails,
    Map: Map,
    MapPin: MapPin,
    MapPinOff: MapPinOff,
    Martini: Martini,
    Maximize: Maximize,
    Maximize2: Maximize2,
    Medal: Medal,
    Megaphone: Megaphone,
    MegaphoneOff: MegaphoneOff,
    Meh: Meh,
    MemoryStick: MemoryStick,
    Menu: Menu,
    MenuSquare: MenuSquare,
    Merge: Merge,
    MessageCircle: MessageCircle,
    MessageSquare: MessageSquare,
    MessageSquareDashed: MessageSquareDashed,
    MessageSquarePlus: MessageSquarePlus,
    MessagesSquare: MessagesSquare,
    Mic: Mic,
    Mic2: Mic2,
    MicOff: MicOff,
    Microscope: Microscope,
    Microwave: Microwave,
    Milestone: Milestone,
    Milk: Milk,
    MilkOff: MilkOff,
    Minimize: Minimize,
    Minimize2: Minimize2,
    Minus: Minus,
    MinusCircle: MinusCircle,
    MinusSquare: MinusSquare,
    Monitor: Monitor,
    MonitorCheck: MonitorCheck,
    MonitorDot: MonitorDot,
    MonitorDown: MonitorDown,
    MonitorOff: MonitorOff,
    MonitorPause: MonitorPause,
    MonitorPlay: MonitorPlay,
    MonitorSmartphone: MonitorSmartphone,
    MonitorSpeaker: MonitorSpeaker,
    MonitorStop: MonitorStop,
    MonitorUp: MonitorUp,
    MonitorX: MonitorX,
    Moon: Moon,
    MoonStar: MoonStar,
    MoreHorizontal: MoreHorizontal,
    MoreVertical: MoreVertical,
    Mountain: Mountain,
    MountainSnow: MountainSnow,
    Mouse: Mouse,
    MousePointer: MousePointer,
    MousePointer2: MousePointer2,
    MousePointerClick: MousePointerClick,
    Move: Move,
    Move3d: Move3d,
    MoveDiagonal: MoveDiagonal,
    MoveDiagonal2: MoveDiagonal2,
    MoveDown: MoveDown,
    MoveDownLeft: MoveDownLeft,
    MoveDownRight: MoveDownRight,
    MoveHorizontal: MoveHorizontal,
    MoveLeft: MoveLeft,
    MoveRight: MoveRight,
    MoveUp: MoveUp,
    MoveUpLeft: MoveUpLeft,
    MoveUpRight: MoveUpRight,
    MoveVertical: MoveVertical,
    Music: Music,
    Music2: Music2,
    Music3: Music3,
    Music4: Music4,
    Navigation: Navigation,
    Navigation2: Navigation2,
    Navigation2Off: Navigation2Off,
    NavigationOff: NavigationOff,
    Network: Network,
    Newspaper: Newspaper,
    Nfc: Nfc,
    Nut: Nut,
    NutOff: NutOff,
    Octagon: Octagon,
    Option: Option,
    Orbit: Orbit,
    Outdent: Outdent,
    Package: Package,
    Package2: Package2,
    PackageCheck: PackageCheck,
    PackageMinus: PackageMinus,
    PackageOpen: PackageOpen,
    PackagePlus: PackagePlus,
    PackageSearch: PackageSearch,
    PackageX: PackageX,
    PaintBucket: PaintBucket,
    Paintbrush: Paintbrush,
    Paintbrush2: Paintbrush2,
    Palette: Palette,
    Palmtree: Palmtree,
    PanelBottom: PanelBottom,
    PanelBottomClose: PanelBottomClose,
    PanelBottomInactive: PanelBottomInactive,
    PanelBottomOpen: PanelBottomOpen,
    PanelLeft: PanelLeft,
    PanelLeftClose: PanelLeftClose,
    PanelLeftInactive: PanelLeftInactive,
    PanelLeftOpen: PanelLeftOpen,
    PanelRight: PanelRight,
    PanelRightClose: PanelRightClose,
    PanelRightInactive: PanelRightInactive,
    PanelRightOpen: PanelRightOpen,
    PanelTop: PanelTop,
    PanelTopClose: PanelTopClose,
    PanelTopInactive: PanelTopInactive,
    PanelTopOpen: PanelTopOpen,
    Paperclip: Paperclip,
    Parentheses: Parentheses,
    ParkingCircle: ParkingCircle,
    ParkingCircleOff: ParkingCircleOff,
    ParkingSquare: ParkingSquare,
    ParkingSquareOff: ParkingSquareOff,
    PartyPopper: PartyPopper,
    Pause: Pause,
    PauseCircle: PauseCircle,
    PauseOctagon: PauseOctagon,
    PcCase: PcCase,
    Pen: Pen,
    PenLine: PenLine,
    PenSquare: PenSquare,
    PenTool: PenTool,
    Pencil: Pencil,
    PencilLine: PencilLine,
    PencilRuler: PencilRuler,
    Percent: Percent,
    PersonStanding: PersonStanding,
    Phone: Phone,
    PhoneCall: PhoneCall,
    PhoneForwarded: PhoneForwarded,
    PhoneIncoming: PhoneIncoming,
    PhoneMissed: PhoneMissed,
    PhoneOff: PhoneOff,
    PhoneOutgoing: PhoneOutgoing,
    Pi: Pi,
    PiSquare: PiSquare,
    PictureInPicture: PictureInPicture,
    PictureInPicture2: PictureInPicture2,
    PieChart: PieChart,
    PiggyBank: PiggyBank,
    Pilcrow: Pilcrow,
    PilcrowSquare: PilcrowSquare,
    Pill: Pill,
    Pin: Pin,
    PinOff: PinOff,
    Pipette: Pipette,
    Pizza: Pizza,
    Plane: Plane,
    PlaneLanding: PlaneLanding,
    PlaneTakeoff: PlaneTakeoff,
    Play: Play,
    PlayCircle: PlayCircle,
    PlaySquare: PlaySquare,
    Plug: Plug,
    Plug2: Plug2,
    PlugZap: PlugZap,
    PlugZap2: PlugZap2,
    Plus: Plus,
    PlusCircle: PlusCircle,
    PlusSquare: PlusSquare,
    Pocket: Pocket,
    PocketKnife: PocketKnife,
    Podcast: Podcast,
    Pointer: Pointer,
    Popcorn: Popcorn,
    Popsicle: Popsicle,
    PoundSterling: PoundSterling,
    Power: Power,
    PowerOff: PowerOff,
    Presentation: Presentation,
    Printer: Printer,
    Projector: Projector,
    Puzzle: Puzzle,
    QrCode: QrCode,
    Quote: Quote,
    Radar: Radar,
    Radiation: Radiation,
    Radio: Radio,
    RadioReceiver: RadioReceiver,
    RadioTower: RadioTower,
    Rainbow: Rainbow,
    Rat: Rat,
    Ratio: Ratio,
    Receipt: Receipt,
    RectangleHorizontal: RectangleHorizontal,
    RectangleVertical: RectangleVertical,
    Recycle: Recycle,
    Redo: Redo,
    Redo2: Redo2,
    RedoDot: RedoDot,
    RefreshCcw: RefreshCcw,
    RefreshCcwDot: RefreshCcwDot,
    RefreshCw: RefreshCw,
    RefreshCwOff: RefreshCwOff,
    Refrigerator: Refrigerator,
    Regex: Regex,
    RemoveFormatting: RemoveFormatting,
    Repeat: Repeat,
    Repeat1: Repeat1,
    Repeat2: Repeat2,
    Replace: Replace,
    ReplaceAll: ReplaceAll,
    Reply: Reply,
    ReplyAll: ReplyAll,
    Rewind: Rewind,
    Rocket: Rocket,
    RockingChair: RockingChair,
    RollerCoaster: RollerCoaster,
    Rotate3d: Rotate3d,
    RotateCcw: RotateCcw,
    RotateCw: RotateCw,
    Router: Router,
    Rows: Rows,
    Rss: Rss,
    Ruler: Ruler,
    RussianRuble: RussianRuble,
    Sailboat: Sailboat,
    Salad: Salad,
    Sandwich: Sandwich,
    Satellite: Satellite,
    SatelliteDish: SatelliteDish,
    Save: Save,
    SaveAll: SaveAll,
    Scale: Scale,
    Scale3d: Scale3d,
    Scaling: Scaling,
    Scan: Scan,
    ScanFace: ScanFace,
    ScanLine: ScanLine,
    ScatterChart: ScatterChart,
    School: School,
    School2: School2,
    Scissors: Scissors,
    ScissorsLineDashed: ScissorsLineDashed,
    ScissorsSquare: ScissorsSquare,
    ScissorsSquareDashedBottom: ScissorsSquareDashedBottom,
    ScreenShare: ScreenShare,
    ScreenShareOff: ScreenShareOff,
    Scroll: Scroll,
    ScrollText: ScrollText,
    Search: Search,
    SearchCheck: SearchCheck,
    SearchCode: SearchCode,
    SearchSlash: SearchSlash,
    SearchX: SearchX,
    Send: Send,
    SendHorizonal: SendHorizonal,
    SendToBack: SendToBack,
    SeparatorHorizontal: SeparatorHorizontal,
    SeparatorVertical: SeparatorVertical,
    Server: Server,
    ServerCog: ServerCog,
    ServerCrash: ServerCrash,
    ServerOff: ServerOff,
    Settings: Settings,
    Settings2: Settings2,
    Shapes: Shapes,
    Share: Share,
    Share2: Share2,
    Sheet: Sheet,
    Shield: Shield,
    ShieldAlert: ShieldAlert,
    ShieldCheck: ShieldCheck,
    ShieldClose: ShieldClose,
    ShieldOff: ShieldOff,
    ShieldQuestion: ShieldQuestion,
    Ship: Ship,
    Shirt: Shirt,
    ShoppingBag: ShoppingBag,
    ShoppingBasket: ShoppingBasket,
    ShoppingCart: ShoppingCart,
    Shovel: Shovel,
    ShowerHead: ShowerHead,
    Shrink: Shrink,
    Shrub: Shrub,
    Shuffle: Shuffle,
    Sigma: Sigma,
    SigmaSquare: SigmaSquare,
    Signal: Signal,
    SignalHigh: SignalHigh,
    SignalLow: SignalLow,
    SignalMedium: SignalMedium,
    SignalZero: SignalZero,
    Siren: Siren,
    SkipBack: SkipBack,
    SkipForward: SkipForward,
    Skull: Skull,
    Slack: Slack,
    Slice: Slice,
    Sliders: Sliders,
    SlidersHorizontal: SlidersHorizontal,
    Smartphone: Smartphone,
    SmartphoneCharging: SmartphoneCharging,
    SmartphoneNfc: SmartphoneNfc,
    Smile: Smile,
    SmilePlus: SmilePlus,
    Snowflake: Snowflake,
    Sofa: Sofa,
    Soup: Soup,
    Space: Space,
    Spade: Spade,
    Sparkle: Sparkle,
    Sparkles: Sparkles,
    Speaker: Speaker,
    SpellCheck: SpellCheck,
    SpellCheck2: SpellCheck2,
    Spline: Spline,
    Split: Split,
    SplitSquareHorizontal: SplitSquareHorizontal,
    SplitSquareVertical: SplitSquareVertical,
    SprayCan: SprayCan,
    Sprout: Sprout,
    Square: Square,
    SquareAsterisk: SquareAsterisk,
    SquareCode: SquareCode,
    SquareDashedBottom: SquareDashedBottom,
    SquareDashedBottomCode: SquareDashedBottomCode,
    SquareDot: SquareDot,
    SquareEqual: SquareEqual,
    SquareSlash: SquareSlash,
    SquareStack: SquareStack,
    Squirrel: Squirrel,
    Stamp: Stamp,
    Star: Star,
    StarHalf: StarHalf,
    StarOff: StarOff,
    StepBack: StepBack,
    StepForward: StepForward,
    Stethoscope: Stethoscope,
    Sticker: Sticker,
    StickyNote: StickyNote,
    StopCircle: StopCircle,
    Store: Store,
    StretchHorizontal: StretchHorizontal,
    StretchVertical: StretchVertical,
    Strikethrough: Strikethrough,
    Subscript: Subscript,
    Subtitles: Subtitles,
    Sun: Sun,
    SunDim: SunDim,
    SunMedium: SunMedium,
    SunMoon: SunMoon,
    SunSnow: SunSnow,
    Sunrise: Sunrise,
    Sunset: Sunset,
    Superscript: Superscript,
    SwissFranc: SwissFranc,
    SwitchCamera: SwitchCamera,
    Sword: Sword,
    Swords: Swords,
    Syringe: Syringe,
    Table: Table,
    Table2: Table2,
    TableProperties: TableProperties,
    Tablet: Tablet,
    Tablets: Tablets,
    Tag: Tag,
    Tags: Tags,
    Tally1: Tally1,
    Tally2: Tally2,
    Tally3: Tally3,
    Tally4: Tally4,
    Tally5: Tally5,
    Target: Target,
    Tent: Tent,
    Terminal: Terminal,
    TerminalSquare: TerminalSquare,
    TestTube: TestTube,
    TestTube2: TestTube2,
    TestTubes: TestTubes,
    Text: Text,
    TextCursor: TextCursor,
    TextCursorInput: TextCursorInput,
    TextQuote: TextQuote,
    TextSelect: TextSelect,
    Thermometer: Thermometer,
    ThermometerSnowflake: ThermometerSnowflake,
    ThermometerSun: ThermometerSun,
    ThumbsDown: ThumbsDown,
    ThumbsUp: ThumbsUp,
    Ticket: Ticket,
    Timer: Timer,
    TimerOff: TimerOff,
    TimerReset: TimerReset,
    ToggleLeft: ToggleLeft,
    ToggleRight: ToggleRight,
    Tornado: Tornado,
    Touchpad: Touchpad,
    TouchpadOff: TouchpadOff,
    TowerControl: TowerControl,
    ToyBrick: ToyBrick,
    Train: Train,
    Trash: Trash,
    Trash2: Trash2,
    TreeDeciduous: TreeDeciduous,
    TreePine: TreePine,
    Trees: Trees,
    Trello: Trello,
    TrendingDown: TrendingDown,
    TrendingUp: TrendingUp,
    Triangle: Triangle,
    TriangleRight: TriangleRight,
    Trophy: Trophy,
    Truck: Truck,
    Tv: Tv,
    Tv2: Tv2,
    Twitch: Twitch,
    Twitter: Twitter,
    Type: Type,
    Umbrella: Umbrella,
    Underline: Underline,
    Undo: Undo,
    Undo2: Undo2,
    UndoDot: UndoDot,
    UnfoldHorizontal: UnfoldHorizontal,
    UnfoldVertical: UnfoldVertical,
    Ungroup: Ungroup,
    Unlink: Unlink,
    Unlink2: Unlink2,
    Unlock: Unlock,
    Unplug: Unplug,
    Upload: Upload,
    UploadCloud: UploadCloud,
    Usb: Usb,
    User: User,
    User2: User2,
    UserCheck: UserCheck,
    UserCheck2: UserCheck2,
    UserCircle: UserCircle,
    UserCircle2: UserCircle2,
    UserCog: UserCog,
    UserCog2: UserCog2,
    UserMinus: UserMinus,
    UserMinus2: UserMinus2,
    UserPlus: UserPlus,
    UserPlus2: UserPlus2,
    UserSquare: UserSquare,
    UserSquare2: UserSquare2,
    UserX: UserX,
    UserX2: UserX2,
    Users: Users,
    Users2: Users2,
    Utensils: Utensils,
    UtensilsCrossed: UtensilsCrossed,
    UtilityPole: UtilityPole,
    Variable: Variable,
    Vegan: Vegan,
    VenetianMask: VenetianMask,
    Vibrate: Vibrate,
    VibrateOff: VibrateOff,
    Video: Video,
    VideoOff: VideoOff,
    Videotape: Videotape,
    View: View,
    Voicemail: Voicemail,
    Volume: Volume,
    Volume1: Volume1,
    Volume2: Volume2,
    VolumeX: VolumeX,
    Vote: Vote,
    Wallet: Wallet,
    Wallet2: Wallet2,
    WalletCards: WalletCards,
    Wallpaper: Wallpaper,
    Wand: Wand,
    Wand2: Wand2,
    Warehouse: Warehouse,
    Watch: Watch,
    Waves: Waves,
    Webcam: Webcam,
    Webhook: Webhook,
    Wheat: Wheat,
    WheatOff: WheatOff,
    WholeWord: WholeWord,
    Wifi: Wifi,
    WifiOff: WifiOff,
    Wind: Wind,
    Wine: Wine,
    WineOff: WineOff,
    Workflow: Workflow,
    WrapText: WrapText,
    Wrench: Wrench,
    X: X,
    XCircle: XCircle,
    XOctagon: XOctagon,
    XSquare: XSquare,
    Youtube: Youtube,
    Zap: Zap,
    ZapOff: ZapOff,
    ZoomIn: ZoomIn,
    ZoomOut: ZoomOut
  });

  const createIcons = ({ icons = allIcons, nameAttr = "data-lucide", attrs = {} } = {}) => {
    if (!Object.values(icons).length) {
      throw new Error(
        "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
      );
    }
    if (typeof document === "undefined") {
      throw new Error("`createIcons()` only works in a browser environment.");
    }
    const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach(
      (element) => replaceElement(element, { nameAttr, icons, attrs })
    );
    if (nameAttr === "data-lucide") {
      const deprecatedElements = document.querySelectorAll("[icon-name]");
      if (deprecatedElements.length > 0) {
        console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide");
        Array.from(deprecatedElements).forEach(
          (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
        );
      }
    }
  };

  exports.Accessibility = Accessibility;
  exports.Activity = Activity;
  exports.ActivitySquare = ActivitySquare;
  exports.AirVent = AirVent;
  exports.Airplay = Airplay;
  exports.AlarmCheck = AlarmCheck;
  exports.AlarmClock = AlarmClock;
  exports.AlarmClockOff = AlarmClockOff;
  exports.AlarmMinus = AlarmMinus;
  exports.AlarmPlus = AlarmPlus;
  exports.Album = Album;
  exports.AlertCircle = AlertCircle;
  exports.AlertOctagon = AlertOctagon;
  exports.AlertTriangle = AlertTriangle;
  exports.AlignCenter = AlignCenter;
  exports.AlignCenterHorizontal = AlignCenterHorizontal;
  exports.AlignCenterVertical = AlignCenterVertical;
  exports.AlignEndHorizontal = AlignEndHorizontal;
  exports.AlignEndVertical = AlignEndVertical;
  exports.AlignHorizontalDistributeCenter = AlignHorizontalDistributeCenter;
  exports.AlignHorizontalDistributeEnd = AlignHorizontalDistributeEnd;
  exports.AlignHorizontalDistributeStart = AlignHorizontalDistributeStart;
  exports.AlignHorizontalJustifyCenter = AlignHorizontalJustifyCenter;
  exports.AlignHorizontalJustifyEnd = AlignHorizontalJustifyEnd;
  exports.AlignHorizontalJustifyStart = AlignHorizontalJustifyStart;
  exports.AlignHorizontalSpaceAround = AlignHorizontalSpaceAround;
  exports.AlignHorizontalSpaceBetween = AlignHorizontalSpaceBetween;
  exports.AlignJustify = AlignJustify;
  exports.AlignLeft = AlignLeft;
  exports.AlignRight = AlignRight;
  exports.AlignStartHorizontal = AlignStartHorizontal;
  exports.AlignStartVertical = AlignStartVertical;
  exports.AlignVerticalDistributeCenter = AlignVerticalDistributeCenter;
  exports.AlignVerticalDistributeEnd = AlignVerticalDistributeEnd;
  exports.AlignVerticalDistributeStart = AlignVerticalDistributeStart;
  exports.AlignVerticalJustifyCenter = AlignVerticalJustifyCenter;
  exports.AlignVerticalJustifyEnd = AlignVerticalJustifyEnd;
  exports.AlignVerticalJustifyStart = AlignVerticalJustifyStart;
  exports.AlignVerticalSpaceAround = AlignVerticalSpaceAround;
  exports.AlignVerticalSpaceBetween = AlignVerticalSpaceBetween;
  exports.Ampersand = Ampersand;
  exports.Ampersands = Ampersands;
  exports.Anchor = Anchor;
  exports.Angry = Angry;
  exports.Annoyed = Annoyed;
  exports.Antenna = Antenna;
  exports.Aperture = Aperture;
  exports.AppWindow = AppWindow;
  exports.Apple = Apple;
  exports.Archive = Archive;
  exports.ArchiveRestore = ArchiveRestore;
  exports.AreaChart = AreaChart;
  exports.Armchair = Armchair;
  exports.ArrowBigDown = ArrowBigDown;
  exports.ArrowBigDownDash = ArrowBigDownDash;
  exports.ArrowBigLeft = ArrowBigLeft;
  exports.ArrowBigLeftDash = ArrowBigLeftDash;
  exports.ArrowBigRight = ArrowBigRight;
  exports.ArrowBigRightDash = ArrowBigRightDash;
  exports.ArrowBigUp = ArrowBigUp;
  exports.ArrowBigUpDash = ArrowBigUpDash;
  exports.ArrowDown = ArrowDown;
  exports.ArrowDown01 = ArrowDown01;
  exports.ArrowDown10 = ArrowDown10;
  exports.ArrowDownAZ = ArrowDownAZ;
  exports.ArrowDownCircle = ArrowDownCircle;
  exports.ArrowDownFromLine = ArrowDownFromLine;
  exports.ArrowDownLeft = ArrowDownLeft;
  exports.ArrowDownLeftFromCircle = ArrowDownLeftFromCircle;
  exports.ArrowDownLeftSquare = ArrowDownLeftSquare;
  exports.ArrowDownNarrowWide = ArrowDownNarrowWide;
  exports.ArrowDownRight = ArrowDownRight;
  exports.ArrowDownRightFromCircle = ArrowDownRightFromCircle;
  exports.ArrowDownRightSquare = ArrowDownRightSquare;
  exports.ArrowDownSquare = ArrowDownSquare;
  exports.ArrowDownToDot = ArrowDownToDot;
  exports.ArrowDownToLine = ArrowDownToLine;
  exports.ArrowDownUp = ArrowDownUp;
  exports.ArrowDownWideNarrow = ArrowDownWideNarrow;
  exports.ArrowDownZA = ArrowDownZA;
  exports.ArrowLeft = ArrowLeft;
  exports.ArrowLeftCircle = ArrowLeftCircle;
  exports.ArrowLeftFromLine = ArrowLeftFromLine;
  exports.ArrowLeftRight = ArrowLeftRight;
  exports.ArrowLeftSquare = ArrowLeftSquare;
  exports.ArrowLeftToLine = ArrowLeftToLine;
  exports.ArrowRight = ArrowRight;
  exports.ArrowRightCircle = ArrowRightCircle;
  exports.ArrowRightFromLine = ArrowRightFromLine;
  exports.ArrowRightLeft = ArrowRightLeft;
  exports.ArrowRightSquare = ArrowRightSquare;
  exports.ArrowRightToLine = ArrowRightToLine;
  exports.ArrowUp = ArrowUp;
  exports.ArrowUp01 = ArrowUp01;
  exports.ArrowUp10 = ArrowUp10;
  exports.ArrowUpAZ = ArrowUpAZ;
  exports.ArrowUpCircle = ArrowUpCircle;
  exports.ArrowUpDown = ArrowUpDown;
  exports.ArrowUpFromDot = ArrowUpFromDot;
  exports.ArrowUpFromLine = ArrowUpFromLine;
  exports.ArrowUpLeft = ArrowUpLeft;
  exports.ArrowUpLeftFromCircle = ArrowUpLeftFromCircle;
  exports.ArrowUpLeftSquare = ArrowUpLeftSquare;
  exports.ArrowUpNarrowWide = ArrowUpNarrowWide;
  exports.ArrowUpRight = ArrowUpRight;
  exports.ArrowUpRightFromCircle = ArrowUpRightFromCircle;
  exports.ArrowUpRightSquare = ArrowUpRightSquare;
  exports.ArrowUpSquare = ArrowUpSquare;
  exports.ArrowUpToLine = ArrowUpToLine;
  exports.ArrowUpWideNarrow = ArrowUpWideNarrow;
  exports.ArrowUpZA = ArrowUpZA;
  exports.ArrowsUpFromLine = ArrowsUpFromLine;
  exports.Asterisk = Asterisk;
  exports.AtSign = AtSign;
  exports.Atom = Atom;
  exports.Award = Award;
  exports.Axe = Axe;
  exports.Axis3d = Axis3d;
  exports.Baby = Baby;
  exports.Backpack = Backpack;
  exports.Badge = Badge;
  exports.BadgeAlert = BadgeAlert;
  exports.BadgeCheck = BadgeCheck;
  exports.BadgeDollarSign = BadgeDollarSign;
  exports.BadgeHelp = BadgeHelp;
  exports.BadgeInfo = BadgeInfo;
  exports.BadgeMinus = BadgeMinus;
  exports.BadgePercent = BadgePercent;
  exports.BadgePlus = BadgePlus;
  exports.BadgeX = BadgeX;
  exports.BaggageClaim = BaggageClaim;
  exports.Ban = Ban;
  exports.Banana = Banana;
  exports.Banknote = Banknote;
  exports.BarChart = BarChart;
  exports.BarChart2 = BarChart2;
  exports.BarChart3 = BarChart3;
  exports.BarChart4 = BarChart4;
  exports.BarChartBig = BarChartBig;
  exports.BarChartHorizontal = BarChartHorizontal;
  exports.BarChartHorizontalBig = BarChartHorizontalBig;
  exports.Baseline = Baseline;
  exports.Bath = Bath;
  exports.Battery = Battery;
  exports.BatteryCharging = BatteryCharging;
  exports.BatteryFull = BatteryFull;
  exports.BatteryLow = BatteryLow;
  exports.BatteryMedium = BatteryMedium;
  exports.BatteryWarning = BatteryWarning;
  exports.Beaker = Beaker;
  exports.Bean = Bean;
  exports.BeanOff = BeanOff;
  exports.Bed = Bed;
  exports.BedDouble = BedDouble;
  exports.BedSingle = BedSingle;
  exports.Beef = Beef;
  exports.Beer = Beer;
  exports.Bell = Bell;
  exports.BellDot = BellDot;
  exports.BellMinus = BellMinus;
  exports.BellOff = BellOff;
  exports.BellPlus = BellPlus;
  exports.BellRing = BellRing;
  exports.Bike = Bike;
  exports.Binary = Binary;
  exports.Biohazard = Biohazard;
  exports.Bird = Bird;
  exports.Bitcoin = Bitcoin;
  exports.Blinds = Blinds;
  exports.Bluetooth = Bluetooth;
  exports.BluetoothConnected = BluetoothConnected;
  exports.BluetoothOff = BluetoothOff;
  exports.BluetoothSearching = BluetoothSearching;
  exports.Bold = Bold;
  exports.Bomb = Bomb;
  exports.Bone = Bone;
  exports.Book = Book;
  exports.BookCopy = BookCopy;
  exports.BookDown = BookDown;
  exports.BookKey = BookKey;
  exports.BookLock = BookLock;
  exports.BookMarked = BookMarked;
  exports.BookMinus = BookMinus;
  exports.BookOpen = BookOpen;
  exports.BookOpenCheck = BookOpenCheck;
  exports.BookPlus = BookPlus;
  exports.BookTemplate = BookTemplate;
  exports.BookUp = BookUp;
  exports.BookUp2 = BookUp2;
  exports.BookX = BookX;
  exports.Bookmark = Bookmark;
  exports.BookmarkMinus = BookmarkMinus;
  exports.BookmarkPlus = BookmarkPlus;
  exports.BoomBox = BoomBox;
  exports.Bot = Bot;
  exports.Box = Box;
  exports.BoxSelect = BoxSelect;
  exports.Boxes = Boxes;
  exports.Braces = Braces;
  exports.Brackets = Brackets;
  exports.Brain = Brain;
  exports.BrainCircuit = BrainCircuit;
  exports.BrainCog = BrainCog;
  exports.Briefcase = Briefcase;
  exports.BringToFront = BringToFront;
  exports.Brush = Brush;
  exports.Bug = Bug;
  exports.Building = Building;
  exports.Building2 = Building2;
  exports.Bus = Bus;
  exports.Cable = Cable;
  exports.Cake = Cake;
  exports.CakeSlice = CakeSlice;
  exports.Calculator = Calculator;
  exports.Calendar = Calendar;
  exports.CalendarCheck = CalendarCheck;
  exports.CalendarCheck2 = CalendarCheck2;
  exports.CalendarClock = CalendarClock;
  exports.CalendarDays = CalendarDays;
  exports.CalendarHeart = CalendarHeart;
  exports.CalendarMinus = CalendarMinus;
  exports.CalendarOff = CalendarOff;
  exports.CalendarPlus = CalendarPlus;
  exports.CalendarRange = CalendarRange;
  exports.CalendarSearch = CalendarSearch;
  exports.CalendarX = CalendarX;
  exports.CalendarX2 = CalendarX2;
  exports.Camera = Camera;
  exports.CameraOff = CameraOff;
  exports.CandlestickChart = CandlestickChart;
  exports.Candy = Candy;
  exports.CandyCane = CandyCane;
  exports.CandyOff = CandyOff;
  exports.Car = Car;
  exports.Carrot = Carrot;
  exports.CaseLower = CaseLower;
  exports.CaseSensitive = CaseSensitive;
  exports.CaseUpper = CaseUpper;
  exports.CassetteTape = CassetteTape;
  exports.Cast = Cast;
  exports.Castle = Castle;
  exports.Cat = Cat;
  exports.Check = Check;
  exports.CheckCheck = CheckCheck;
  exports.CheckCircle = CheckCircle;
  exports.CheckCircle2 = CheckCircle2;
  exports.CheckSquare = CheckSquare;
  exports.ChefHat = ChefHat;
  exports.Cherry = Cherry;
  exports.ChevronDown = ChevronDown;
  exports.ChevronDownCircle = ChevronDownCircle;
  exports.ChevronDownSquare = ChevronDownSquare;
  exports.ChevronFirst = ChevronFirst;
  exports.ChevronLast = ChevronLast;
  exports.ChevronLeft = ChevronLeft;
  exports.ChevronLeftCircle = ChevronLeftCircle;
  exports.ChevronLeftSquare = ChevronLeftSquare;
  exports.ChevronRight = ChevronRight;
  exports.ChevronRightCircle = ChevronRightCircle;
  exports.ChevronRightSquare = ChevronRightSquare;
  exports.ChevronUp = ChevronUp;
  exports.ChevronUpCircle = ChevronUpCircle;
  exports.ChevronUpSquare = ChevronUpSquare;
  exports.ChevronsDown = ChevronsDown;
  exports.ChevronsDownUp = ChevronsDownUp;
  exports.ChevronsLeft = ChevronsLeft;
  exports.ChevronsLeftRight = ChevronsLeftRight;
  exports.ChevronsRight = ChevronsRight;
  exports.ChevronsRightLeft = ChevronsRightLeft;
  exports.ChevronsUp = ChevronsUp;
  exports.ChevronsUpDown = ChevronsUpDown;
  exports.Chrome = Chrome;
  exports.Church = Church;
  exports.Cigarette = Cigarette;
  exports.CigaretteOff = CigaretteOff;
  exports.Circle = Circle;
  exports.CircleDashed = CircleDashed;
  exports.CircleDollarSign = CircleDollarSign;
  exports.CircleDot = CircleDot;
  exports.CircleDotDashed = CircleDotDashed;
  exports.CircleEllipsis = CircleEllipsis;
  exports.CircleEqual = CircleEqual;
  exports.CircleOff = CircleOff;
  exports.CircleSlash = CircleSlash;
  exports.CircleSlash2 = CircleSlash2;
  exports.CircuitBoard = CircuitBoard;
  exports.Citrus = Citrus;
  exports.Clapperboard = Clapperboard;
  exports.Clipboard = Clipboard;
  exports.ClipboardCheck = ClipboardCheck;
  exports.ClipboardCopy = ClipboardCopy;
  exports.ClipboardEdit = ClipboardEdit;
  exports.ClipboardList = ClipboardList;
  exports.ClipboardPaste = ClipboardPaste;
  exports.ClipboardSignature = ClipboardSignature;
  exports.ClipboardType = ClipboardType;
  exports.ClipboardX = ClipboardX;
  exports.Clock = Clock;
  exports.Clock1 = Clock1;
  exports.Clock10 = Clock10;
  exports.Clock11 = Clock11;
  exports.Clock12 = Clock12;
  exports.Clock2 = Clock2;
  exports.Clock3 = Clock3;
  exports.Clock4 = Clock4;
  exports.Clock5 = Clock5;
  exports.Clock6 = Clock6;
  exports.Clock7 = Clock7;
  exports.Clock8 = Clock8;
  exports.Clock9 = Clock9;
  exports.Cloud = Cloud;
  exports.CloudCog = CloudCog;
  exports.CloudDrizzle = CloudDrizzle;
  exports.CloudFog = CloudFog;
  exports.CloudHail = CloudHail;
  exports.CloudLightning = CloudLightning;
  exports.CloudMoon = CloudMoon;
  exports.CloudMoonRain = CloudMoonRain;
  exports.CloudOff = CloudOff;
  exports.CloudRain = CloudRain;
  exports.CloudRainWind = CloudRainWind;
  exports.CloudSnow = CloudSnow;
  exports.CloudSun = CloudSun;
  exports.CloudSunRain = CloudSunRain;
  exports.Cloudy = Cloudy;
  exports.Clover = Clover;
  exports.Club = Club;
  exports.Code = Code;
  exports.Code2 = Code2;
  exports.Codepen = Codepen;
  exports.Codesandbox = Codesandbox;
  exports.Coffee = Coffee;
  exports.Cog = Cog;
  exports.Coins = Coins;
  exports.Columns = Columns;
  exports.Combine = Combine;
  exports.Command = Command;
  exports.Compass = Compass;
  exports.Component = Component;
  exports.Computer = Computer;
  exports.ConciergeBell = ConciergeBell;
  exports.Construction = Construction;
  exports.Contact = Contact;
  exports.Contact2 = Contact2;
  exports.Container = Container;
  exports.Contrast = Contrast;
  exports.Cookie = Cookie;
  exports.Copy = Copy;
  exports.CopyCheck = CopyCheck;
  exports.CopyMinus = CopyMinus;
  exports.CopyPlus = CopyPlus;
  exports.CopySlash = CopySlash;
  exports.CopyX = CopyX;
  exports.Copyleft = Copyleft;
  exports.Copyright = Copyright;
  exports.CornerDownLeft = CornerDownLeft;
  exports.CornerDownRight = CornerDownRight;
  exports.CornerLeftDown = CornerLeftDown;
  exports.CornerLeftUp = CornerLeftUp;
  exports.CornerRightDown = CornerRightDown;
  exports.CornerRightUp = CornerRightUp;
  exports.CornerUpLeft = CornerUpLeft;
  exports.CornerUpRight = CornerUpRight;
  exports.Cpu = Cpu;
  exports.CreativeCommons = CreativeCommons;
  exports.CreditCard = CreditCard;
  exports.Croissant = Croissant;
  exports.Crop = Crop;
  exports.Cross = Cross;
  exports.Crosshair = Crosshair;
  exports.Crown = Crown;
  exports.CupSoda = CupSoda;
  exports.Currency = Currency;
  exports.Database = Database;
  exports.DatabaseBackup = DatabaseBackup;
  exports.Delete = Delete;
  exports.Dessert = Dessert;
  exports.Diamond = Diamond;
  exports.Dice1 = Dice1;
  exports.Dice2 = Dice2;
  exports.Dice3 = Dice3;
  exports.Dice4 = Dice4;
  exports.Dice5 = Dice5;
  exports.Dice6 = Dice6;
  exports.Dices = Dices;
  exports.Diff = Diff;
  exports.Disc = Disc;
  exports.Disc2 = Disc2;
  exports.Disc3 = Disc3;
  exports.Divide = Divide;
  exports.DivideCircle = DivideCircle;
  exports.DivideSquare = DivideSquare;
  exports.Dna = Dna;
  exports.DnaOff = DnaOff;
  exports.Dog = Dog;
  exports.DollarSign = DollarSign;
  exports.Donut = Donut;
  exports.DoorClosed = DoorClosed;
  exports.DoorOpen = DoorOpen;
  exports.Dot = Dot;
  exports.Download = Download;
  exports.DownloadCloud = DownloadCloud;
  exports.Dribbble = Dribbble;
  exports.Droplet = Droplet;
  exports.Droplets = Droplets;
  exports.Drumstick = Drumstick;
  exports.Dumbbell = Dumbbell;
  exports.Ear = Ear;
  exports.EarOff = EarOff;
  exports.Egg = Egg;
  exports.EggFried = EggFried;
  exports.EggOff = EggOff;
  exports.Equal = Equal;
  exports.EqualNot = EqualNot;
  exports.Eraser = Eraser;
  exports.Euro = Euro;
  exports.Expand = Expand;
  exports.ExternalLink = ExternalLink;
  exports.Eye = Eye;
  exports.EyeOff = EyeOff;
  exports.Facebook = Facebook;
  exports.Factory = Factory;
  exports.Fan = Fan;
  exports.FastForward = FastForward;
  exports.Feather = Feather;
  exports.FerrisWheel = FerrisWheel;
  exports.Figma = Figma;
  exports.File = File;
  exports.FileArchive = FileArchive;
  exports.FileAudio = FileAudio;
  exports.FileAudio2 = FileAudio2;
  exports.FileAxis3d = FileAxis3d;
  exports.FileBadge = FileBadge;
  exports.FileBadge2 = FileBadge2;
  exports.FileBarChart = FileBarChart;
  exports.FileBarChart2 = FileBarChart2;
  exports.FileBox = FileBox;
  exports.FileCheck = FileCheck;
  exports.FileCheck2 = FileCheck2;
  exports.FileClock = FileClock;
  exports.FileCode = FileCode;
  exports.FileCode2 = FileCode2;
  exports.FileCog = FileCog;
  exports.FileCog2 = FileCog2;
  exports.FileDiff = FileDiff;
  exports.FileDigit = FileDigit;
  exports.FileDown = FileDown;
  exports.FileEdit = FileEdit;
  exports.FileHeart = FileHeart;
  exports.FileImage = FileImage;
  exports.FileInput = FileInput;
  exports.FileJson = FileJson;
  exports.FileJson2 = FileJson2;
  exports.FileKey = FileKey;
  exports.FileKey2 = FileKey2;
  exports.FileLineChart = FileLineChart;
  exports.FileLock = FileLock;
  exports.FileLock2 = FileLock2;
  exports.FileMinus = FileMinus;
  exports.FileMinus2 = FileMinus2;
  exports.FileOutput = FileOutput;
  exports.FilePieChart = FilePieChart;
  exports.FilePlus = FilePlus;
  exports.FilePlus2 = FilePlus2;
  exports.FileQuestion = FileQuestion;
  exports.FileScan = FileScan;
  exports.FileSearch = FileSearch;
  exports.FileSearch2 = FileSearch2;
  exports.FileSignature = FileSignature;
  exports.FileSpreadsheet = FileSpreadsheet;
  exports.FileStack = FileStack;
  exports.FileSymlink = FileSymlink;
  exports.FileTerminal = FileTerminal;
  exports.FileText = FileText;
  exports.FileType = FileType;
  exports.FileType2 = FileType2;
  exports.FileUp = FileUp;
  exports.FileVideo = FileVideo;
  exports.FileVideo2 = FileVideo2;
  exports.FileVolume = FileVolume;
  exports.FileVolume2 = FileVolume2;
  exports.FileWarning = FileWarning;
  exports.FileX = FileX;
  exports.FileX2 = FileX2;
  exports.Files = Files;
  exports.Film = Film;
  exports.Filter = Filter;
  exports.FilterX = FilterX;
  exports.Fingerprint = Fingerprint;
  exports.Fish = Fish;
  exports.FishOff = FishOff;
  exports.Flag = Flag;
  exports.FlagOff = FlagOff;
  exports.FlagTriangleLeft = FlagTriangleLeft;
  exports.FlagTriangleRight = FlagTriangleRight;
  exports.Flame = Flame;
  exports.Flashlight = Flashlight;
  exports.FlashlightOff = FlashlightOff;
  exports.FlaskConical = FlaskConical;
  exports.FlaskConicalOff = FlaskConicalOff;
  exports.FlaskRound = FlaskRound;
  exports.FlipHorizontal = FlipHorizontal;
  exports.FlipHorizontal2 = FlipHorizontal2;
  exports.FlipVertical = FlipVertical;
  exports.FlipVertical2 = FlipVertical2;
  exports.Flower = Flower;
  exports.Flower2 = Flower2;
  exports.Focus = Focus;
  exports.FoldHorizontal = FoldHorizontal;
  exports.FoldVertical = FoldVertical;
  exports.Folder = Folder;
  exports.FolderArchive = FolderArchive;
  exports.FolderCheck = FolderCheck;
  exports.FolderClock = FolderClock;
  exports.FolderClosed = FolderClosed;
  exports.FolderCog = FolderCog;
  exports.FolderCog2 = FolderCog2;
  exports.FolderDot = FolderDot;
  exports.FolderDown = FolderDown;
  exports.FolderEdit = FolderEdit;
  exports.FolderGit = FolderGit;
  exports.FolderGit2 = FolderGit2;
  exports.FolderHeart = FolderHeart;
  exports.FolderInput = FolderInput;
  exports.FolderKanban = FolderKanban;
  exports.FolderKey = FolderKey;
  exports.FolderLock = FolderLock;
  exports.FolderMinus = FolderMinus;
  exports.FolderOpen = FolderOpen;
  exports.FolderOpenDot = FolderOpenDot;
  exports.FolderOutput = FolderOutput;
  exports.FolderPlus = FolderPlus;
  exports.FolderRoot = FolderRoot;
  exports.FolderSearch = FolderSearch;
  exports.FolderSearch2 = FolderSearch2;
  exports.FolderSymlink = FolderSymlink;
  exports.FolderSync = FolderSync;
  exports.FolderTree = FolderTree;
  exports.FolderUp = FolderUp;
  exports.FolderX = FolderX;
  exports.Folders = Folders;
  exports.Footprints = Footprints;
  exports.Forklift = Forklift;
  exports.FormInput = FormInput;
  exports.Forward = Forward;
  exports.Frame = Frame;
  exports.Framer = Framer;
  exports.Frown = Frown;
  exports.Fuel = Fuel;
  exports.FunctionSquare = FunctionSquare;
  exports.GalleryHorizontal = GalleryHorizontal;
  exports.GalleryHorizontalEnd = GalleryHorizontalEnd;
  exports.GalleryThumbnails = GalleryThumbnails;
  exports.GalleryVertical = GalleryVertical;
  exports.GalleryVerticalEnd = GalleryVerticalEnd;
  exports.Gamepad = Gamepad;
  exports.Gamepad2 = Gamepad2;
  exports.GanttChart = GanttChart;
  exports.GanttChartSquare = GanttChartSquare;
  exports.Gauge = Gauge;
  exports.GaugeCircle = GaugeCircle;
  exports.Gavel = Gavel;
  exports.Gem = Gem;
  exports.Ghost = Ghost;
  exports.Gift = Gift;
  exports.GitBranch = GitBranch;
  exports.GitBranchPlus = GitBranchPlus;
  exports.GitCommit = GitCommit;
  exports.GitCompare = GitCompare;
  exports.GitFork = GitFork;
  exports.GitMerge = GitMerge;
  exports.GitPullRequest = GitPullRequest;
  exports.GitPullRequestClosed = GitPullRequestClosed;
  exports.GitPullRequestDraft = GitPullRequestDraft;
  exports.Github = Github;
  exports.Gitlab = Gitlab;
  exports.GlassWater = GlassWater;
  exports.Glasses = Glasses;
  exports.Globe = Globe;
  exports.Globe2 = Globe2;
  exports.Goal = Goal;
  exports.Grab = Grab;
  exports.GraduationCap = GraduationCap;
  exports.Grape = Grape;
  exports.Grid = Grid;
  exports.Grip = Grip;
  exports.GripHorizontal = GripHorizontal;
  exports.GripVertical = GripVertical;
  exports.Group = Group;
  exports.Hammer = Hammer;
  exports.Hand = Hand;
  exports.HandMetal = HandMetal;
  exports.HardDrive = HardDrive;
  exports.HardDriveDownload = HardDriveDownload;
  exports.HardDriveUpload = HardDriveUpload;
  exports.HardHat = HardHat;
  exports.Hash = Hash;
  exports.Haze = Haze;
  exports.HdmiPort = HdmiPort;
  exports.Heading = Heading;
  exports.Heading1 = Heading1;
  exports.Heading2 = Heading2;
  exports.Heading3 = Heading3;
  exports.Heading4 = Heading4;
  exports.Heading5 = Heading5;
  exports.Heading6 = Heading6;
  exports.Headphones = Headphones;
  exports.Heart = Heart;
  exports.HeartCrack = HeartCrack;
  exports.HeartHandshake = HeartHandshake;
  exports.HeartOff = HeartOff;
  exports.HeartPulse = HeartPulse;
  exports.HelpCircle = HelpCircle;
  exports.HelpingHand = HelpingHand;
  exports.Hexagon = Hexagon;
  exports.Highlighter = Highlighter;
  exports.History = History;
  exports.Home = Home;
  exports.Hop = Hop;
  exports.HopOff = HopOff;
  exports.Hotel = Hotel;
  exports.Hourglass = Hourglass;
  exports.IceCream = IceCream;
  exports.IceCream2 = IceCream2;
  exports.Image = Image;
  exports.ImageMinus = ImageMinus;
  exports.ImageOff = ImageOff;
  exports.ImagePlus = ImagePlus;
  exports.Import = Import;
  exports.Inbox = Inbox;
  exports.Indent = Indent;
  exports.IndianRupee = IndianRupee;
  exports.Infinity = Infinity;
  exports.Info = Info;
  exports.Inspect = Inspect;
  exports.Instagram = Instagram;
  exports.Italic = Italic;
  exports.IterationCcw = IterationCcw;
  exports.IterationCw = IterationCw;
  exports.JapaneseYen = JapaneseYen;
  exports.Joystick = Joystick;
  exports.Kanban = Kanban;
  exports.KanbanSquare = KanbanSquare;
  exports.KanbanSquareDashed = KanbanSquareDashed;
  exports.Key = Key;
  exports.KeyRound = KeyRound;
  exports.KeySquare = KeySquare;
  exports.Keyboard = Keyboard;
  exports.Lamp = Lamp;
  exports.LampCeiling = LampCeiling;
  exports.LampDesk = LampDesk;
  exports.LampFloor = LampFloor;
  exports.LampWallDown = LampWallDown;
  exports.LampWallUp = LampWallUp;
  exports.Landmark = Landmark;
  exports.Languages = Languages;
  exports.Laptop = Laptop;
  exports.Laptop2 = Laptop2;
  exports.Lasso = Lasso;
  exports.LassoSelect = LassoSelect;
  exports.Laugh = Laugh;
  exports.Layers = Layers;
  exports.Layout = Layout;
  exports.LayoutDashboard = LayoutDashboard;
  exports.LayoutGrid = LayoutGrid;
  exports.LayoutList = LayoutList;
  exports.LayoutPanelLeft = LayoutPanelLeft;
  exports.LayoutPanelTop = LayoutPanelTop;
  exports.LayoutTemplate = LayoutTemplate;
  exports.Leaf = Leaf;
  exports.LeafyGreen = LeafyGreen;
  exports.Library = Library;
  exports.LifeBuoy = LifeBuoy;
  exports.Ligature = Ligature;
  exports.Lightbulb = Lightbulb;
  exports.LightbulbOff = LightbulbOff;
  exports.LineChart = LineChart;
  exports.Link = Link;
  exports.Link2 = Link2;
  exports.Link2Off = Link2Off;
  exports.Linkedin = Linkedin;
  exports.List = List;
  exports.ListChecks = ListChecks;
  exports.ListEnd = ListEnd;
  exports.ListFilter = ListFilter;
  exports.ListMinus = ListMinus;
  exports.ListMusic = ListMusic;
  exports.ListOrdered = ListOrdered;
  exports.ListPlus = ListPlus;
  exports.ListRestart = ListRestart;
  exports.ListStart = ListStart;
  exports.ListTodo = ListTodo;
  exports.ListTree = ListTree;
  exports.ListVideo = ListVideo;
  exports.ListX = ListX;
  exports.Loader = Loader;
  exports.Loader2 = Loader2;
  exports.Locate = Locate;
  exports.LocateFixed = LocateFixed;
  exports.LocateOff = LocateOff;
  exports.Lock = Lock;
  exports.LogIn = LogIn;
  exports.LogOut = LogOut;
  exports.Lollipop = Lollipop;
  exports.Luggage = Luggage;
  exports.Magnet = Magnet;
  exports.Mail = Mail;
  exports.MailCheck = MailCheck;
  exports.MailMinus = MailMinus;
  exports.MailOpen = MailOpen;
  exports.MailPlus = MailPlus;
  exports.MailQuestion = MailQuestion;
  exports.MailSearch = MailSearch;
  exports.MailWarning = MailWarning;
  exports.MailX = MailX;
  exports.Mailbox = Mailbox;
  exports.Mails = Mails;
  exports.Map = Map;
  exports.MapPin = MapPin;
  exports.MapPinOff = MapPinOff;
  exports.Martini = Martini;
  exports.Maximize = Maximize;
  exports.Maximize2 = Maximize2;
  exports.Medal = Medal;
  exports.Megaphone = Megaphone;
  exports.MegaphoneOff = MegaphoneOff;
  exports.Meh = Meh;
  exports.MemoryStick = MemoryStick;
  exports.Menu = Menu;
  exports.MenuSquare = MenuSquare;
  exports.Merge = Merge;
  exports.MessageCircle = MessageCircle;
  exports.MessageSquare = MessageSquare;
  exports.MessageSquareDashed = MessageSquareDashed;
  exports.MessageSquarePlus = MessageSquarePlus;
  exports.MessagesSquare = MessagesSquare;
  exports.Mic = Mic;
  exports.Mic2 = Mic2;
  exports.MicOff = MicOff;
  exports.Microscope = Microscope;
  exports.Microwave = Microwave;
  exports.Milestone = Milestone;
  exports.Milk = Milk;
  exports.MilkOff = MilkOff;
  exports.Minimize = Minimize;
  exports.Minimize2 = Minimize2;
  exports.Minus = Minus;
  exports.MinusCircle = MinusCircle;
  exports.MinusSquare = MinusSquare;
  exports.Monitor = Monitor;
  exports.MonitorCheck = MonitorCheck;
  exports.MonitorDot = MonitorDot;
  exports.MonitorDown = MonitorDown;
  exports.MonitorOff = MonitorOff;
  exports.MonitorPause = MonitorPause;
  exports.MonitorPlay = MonitorPlay;
  exports.MonitorSmartphone = MonitorSmartphone;
  exports.MonitorSpeaker = MonitorSpeaker;
  exports.MonitorStop = MonitorStop;
  exports.MonitorUp = MonitorUp;
  exports.MonitorX = MonitorX;
  exports.Moon = Moon;
  exports.MoonStar = MoonStar;
  exports.MoreHorizontal = MoreHorizontal;
  exports.MoreVertical = MoreVertical;
  exports.Mountain = Mountain;
  exports.MountainSnow = MountainSnow;
  exports.Mouse = Mouse;
  exports.MousePointer = MousePointer;
  exports.MousePointer2 = MousePointer2;
  exports.MousePointerClick = MousePointerClick;
  exports.Move = Move;
  exports.Move3d = Move3d;
  exports.MoveDiagonal = MoveDiagonal;
  exports.MoveDiagonal2 = MoveDiagonal2;
  exports.MoveDown = MoveDown;
  exports.MoveDownLeft = MoveDownLeft;
  exports.MoveDownRight = MoveDownRight;
  exports.MoveHorizontal = MoveHorizontal;
  exports.MoveLeft = MoveLeft;
  exports.MoveRight = MoveRight;
  exports.MoveUp = MoveUp;
  exports.MoveUpLeft = MoveUpLeft;
  exports.MoveUpRight = MoveUpRight;
  exports.MoveVertical = MoveVertical;
  exports.Music = Music;
  exports.Music2 = Music2;
  exports.Music3 = Music3;
  exports.Music4 = Music4;
  exports.Navigation = Navigation;
  exports.Navigation2 = Navigation2;
  exports.Navigation2Off = Navigation2Off;
  exports.NavigationOff = NavigationOff;
  exports.Network = Network;
  exports.Newspaper = Newspaper;
  exports.Nfc = Nfc;
  exports.Nut = Nut;
  exports.NutOff = NutOff;
  exports.Octagon = Octagon;
  exports.Option = Option;
  exports.Orbit = Orbit;
  exports.Outdent = Outdent;
  exports.Package = Package;
  exports.Package2 = Package2;
  exports.PackageCheck = PackageCheck;
  exports.PackageMinus = PackageMinus;
  exports.PackageOpen = PackageOpen;
  exports.PackagePlus = PackagePlus;
  exports.PackageSearch = PackageSearch;
  exports.PackageX = PackageX;
  exports.PaintBucket = PaintBucket;
  exports.Paintbrush = Paintbrush;
  exports.Paintbrush2 = Paintbrush2;
  exports.Palette = Palette;
  exports.Palmtree = Palmtree;
  exports.PanelBottom = PanelBottom;
  exports.PanelBottomClose = PanelBottomClose;
  exports.PanelBottomInactive = PanelBottomInactive;
  exports.PanelBottomOpen = PanelBottomOpen;
  exports.PanelLeft = PanelLeft;
  exports.PanelLeftClose = PanelLeftClose;
  exports.PanelLeftInactive = PanelLeftInactive;
  exports.PanelLeftOpen = PanelLeftOpen;
  exports.PanelRight = PanelRight;
  exports.PanelRightClose = PanelRightClose;
  exports.PanelRightInactive = PanelRightInactive;
  exports.PanelRightOpen = PanelRightOpen;
  exports.PanelTop = PanelTop;
  exports.PanelTopClose = PanelTopClose;
  exports.PanelTopInactive = PanelTopInactive;
  exports.PanelTopOpen = PanelTopOpen;
  exports.Paperclip = Paperclip;
  exports.Parentheses = Parentheses;
  exports.ParkingCircle = ParkingCircle;
  exports.ParkingCircleOff = ParkingCircleOff;
  exports.ParkingSquare = ParkingSquare;
  exports.ParkingSquareOff = ParkingSquareOff;
  exports.PartyPopper = PartyPopper;
  exports.Pause = Pause;
  exports.PauseCircle = PauseCircle;
  exports.PauseOctagon = PauseOctagon;
  exports.PcCase = PcCase;
  exports.Pen = Pen;
  exports.PenLine = PenLine;
  exports.PenSquare = PenSquare;
  exports.PenTool = PenTool;
  exports.Pencil = Pencil;
  exports.PencilLine = PencilLine;
  exports.PencilRuler = PencilRuler;
  exports.Percent = Percent;
  exports.PersonStanding = PersonStanding;
  exports.Phone = Phone;
  exports.PhoneCall = PhoneCall;
  exports.PhoneForwarded = PhoneForwarded;
  exports.PhoneIncoming = PhoneIncoming;
  exports.PhoneMissed = PhoneMissed;
  exports.PhoneOff = PhoneOff;
  exports.PhoneOutgoing = PhoneOutgoing;
  exports.Pi = Pi;
  exports.PiSquare = PiSquare;
  exports.PictureInPicture = PictureInPicture;
  exports.PictureInPicture2 = PictureInPicture2;
  exports.PieChart = PieChart;
  exports.PiggyBank = PiggyBank;
  exports.Pilcrow = Pilcrow;
  exports.PilcrowSquare = PilcrowSquare;
  exports.Pill = Pill;
  exports.Pin = Pin;
  exports.PinOff = PinOff;
  exports.Pipette = Pipette;
  exports.Pizza = Pizza;
  exports.Plane = Plane;
  exports.PlaneLanding = PlaneLanding;
  exports.PlaneTakeoff = PlaneTakeoff;
  exports.Play = Play;
  exports.PlayCircle = PlayCircle;
  exports.PlaySquare = PlaySquare;
  exports.Plug = Plug;
  exports.Plug2 = Plug2;
  exports.PlugZap = PlugZap;
  exports.PlugZap2 = PlugZap2;
  exports.Plus = Plus;
  exports.PlusCircle = PlusCircle;
  exports.PlusSquare = PlusSquare;
  exports.Pocket = Pocket;
  exports.PocketKnife = PocketKnife;
  exports.Podcast = Podcast;
  exports.Pointer = Pointer;
  exports.Popcorn = Popcorn;
  exports.Popsicle = Popsicle;
  exports.PoundSterling = PoundSterling;
  exports.Power = Power;
  exports.PowerOff = PowerOff;
  exports.Presentation = Presentation;
  exports.Printer = Printer;
  exports.Projector = Projector;
  exports.Puzzle = Puzzle;
  exports.QrCode = QrCode;
  exports.Quote = Quote;
  exports.Radar = Radar;
  exports.Radiation = Radiation;
  exports.Radio = Radio;
  exports.RadioReceiver = RadioReceiver;
  exports.RadioTower = RadioTower;
  exports.Rainbow = Rainbow;
  exports.Rat = Rat;
  exports.Ratio = Ratio;
  exports.Receipt = Receipt;
  exports.RectangleHorizontal = RectangleHorizontal;
  exports.RectangleVertical = RectangleVertical;
  exports.Recycle = Recycle;
  exports.Redo = Redo;
  exports.Redo2 = Redo2;
  exports.RedoDot = RedoDot;
  exports.RefreshCcw = RefreshCcw;
  exports.RefreshCcwDot = RefreshCcwDot;
  exports.RefreshCw = RefreshCw;
  exports.RefreshCwOff = RefreshCwOff;
  exports.Refrigerator = Refrigerator;
  exports.Regex = Regex;
  exports.RemoveFormatting = RemoveFormatting;
  exports.Repeat = Repeat;
  exports.Repeat1 = Repeat1;
  exports.Repeat2 = Repeat2;
  exports.Replace = Replace;
  exports.ReplaceAll = ReplaceAll;
  exports.Reply = Reply;
  exports.ReplyAll = ReplyAll;
  exports.Rewind = Rewind;
  exports.Rocket = Rocket;
  exports.RockingChair = RockingChair;
  exports.RollerCoaster = RollerCoaster;
  exports.Rotate3d = Rotate3d;
  exports.RotateCcw = RotateCcw;
  exports.RotateCw = RotateCw;
  exports.Router = Router;
  exports.Rows = Rows;
  exports.Rss = Rss;
  exports.Ruler = Ruler;
  exports.RussianRuble = RussianRuble;
  exports.Sailboat = Sailboat;
  exports.Salad = Salad;
  exports.Sandwich = Sandwich;
  exports.Satellite = Satellite;
  exports.SatelliteDish = SatelliteDish;
  exports.Save = Save;
  exports.SaveAll = SaveAll;
  exports.Scale = Scale;
  exports.Scale3d = Scale3d;
  exports.Scaling = Scaling;
  exports.Scan = Scan;
  exports.ScanFace = ScanFace;
  exports.ScanLine = ScanLine;
  exports.ScatterChart = ScatterChart;
  exports.School = School;
  exports.School2 = School2;
  exports.Scissors = Scissors;
  exports.ScissorsLineDashed = ScissorsLineDashed;
  exports.ScissorsSquare = ScissorsSquare;
  exports.ScissorsSquareDashedBottom = ScissorsSquareDashedBottom;
  exports.ScreenShare = ScreenShare;
  exports.ScreenShareOff = ScreenShareOff;
  exports.Scroll = Scroll;
  exports.ScrollText = ScrollText;
  exports.Search = Search;
  exports.SearchCheck = SearchCheck;
  exports.SearchCode = SearchCode;
  exports.SearchSlash = SearchSlash;
  exports.SearchX = SearchX;
  exports.Send = Send;
  exports.SendHorizonal = SendHorizonal;
  exports.SendToBack = SendToBack;
  exports.SeparatorHorizontal = SeparatorHorizontal;
  exports.SeparatorVertical = SeparatorVertical;
  exports.Server = Server;
  exports.ServerCog = ServerCog;
  exports.ServerCrash = ServerCrash;
  exports.ServerOff = ServerOff;
  exports.Settings = Settings;
  exports.Settings2 = Settings2;
  exports.Shapes = Shapes;
  exports.Share = Share;
  exports.Share2 = Share2;
  exports.Sheet = Sheet;
  exports.Shield = Shield;
  exports.ShieldAlert = ShieldAlert;
  exports.ShieldCheck = ShieldCheck;
  exports.ShieldClose = ShieldClose;
  exports.ShieldOff = ShieldOff;
  exports.ShieldQuestion = ShieldQuestion;
  exports.Ship = Ship;
  exports.Shirt = Shirt;
  exports.ShoppingBag = ShoppingBag;
  exports.ShoppingBasket = ShoppingBasket;
  exports.ShoppingCart = ShoppingCart;
  exports.Shovel = Shovel;
  exports.ShowerHead = ShowerHead;
  exports.Shrink = Shrink;
  exports.Shrub = Shrub;
  exports.Shuffle = Shuffle;
  exports.Sigma = Sigma;
  exports.SigmaSquare = SigmaSquare;
  exports.Signal = Signal;
  exports.SignalHigh = SignalHigh;
  exports.SignalLow = SignalLow;
  exports.SignalMedium = SignalMedium;
  exports.SignalZero = SignalZero;
  exports.Siren = Siren;
  exports.SkipBack = SkipBack;
  exports.SkipForward = SkipForward;
  exports.Skull = Skull;
  exports.Slack = Slack;
  exports.Slice = Slice;
  exports.Sliders = Sliders;
  exports.SlidersHorizontal = SlidersHorizontal;
  exports.Smartphone = Smartphone;
  exports.SmartphoneCharging = SmartphoneCharging;
  exports.SmartphoneNfc = SmartphoneNfc;
  exports.Smile = Smile;
  exports.SmilePlus = SmilePlus;
  exports.Snowflake = Snowflake;
  exports.Sofa = Sofa;
  exports.Soup = Soup;
  exports.Space = Space;
  exports.Spade = Spade;
  exports.Sparkle = Sparkle;
  exports.Sparkles = Sparkles;
  exports.Speaker = Speaker;
  exports.SpellCheck = SpellCheck;
  exports.SpellCheck2 = SpellCheck2;
  exports.Spline = Spline;
  exports.Split = Split;
  exports.SplitSquareHorizontal = SplitSquareHorizontal;
  exports.SplitSquareVertical = SplitSquareVertical;
  exports.SprayCan = SprayCan;
  exports.Sprout = Sprout;
  exports.Square = Square;
  exports.SquareAsterisk = SquareAsterisk;
  exports.SquareCode = SquareCode;
  exports.SquareDashedBottom = SquareDashedBottom;
  exports.SquareDashedBottomCode = SquareDashedBottomCode;
  exports.SquareDot = SquareDot;
  exports.SquareEqual = SquareEqual;
  exports.SquareSlash = SquareSlash;
  exports.SquareStack = SquareStack;
  exports.Squirrel = Squirrel;
  exports.Stamp = Stamp;
  exports.Star = Star;
  exports.StarHalf = StarHalf;
  exports.StarOff = StarOff;
  exports.StepBack = StepBack;
  exports.StepForward = StepForward;
  exports.Stethoscope = Stethoscope;
  exports.Sticker = Sticker;
  exports.StickyNote = StickyNote;
  exports.StopCircle = StopCircle;
  exports.Store = Store;
  exports.StretchHorizontal = StretchHorizontal;
  exports.StretchVertical = StretchVertical;
  exports.Strikethrough = Strikethrough;
  exports.Subscript = Subscript;
  exports.Subtitles = Subtitles;
  exports.Sun = Sun;
  exports.SunDim = SunDim;
  exports.SunMedium = SunMedium;
  exports.SunMoon = SunMoon;
  exports.SunSnow = SunSnow;
  exports.Sunrise = Sunrise;
  exports.Sunset = Sunset;
  exports.Superscript = Superscript;
  exports.SwissFranc = SwissFranc;
  exports.SwitchCamera = SwitchCamera;
  exports.Sword = Sword;
  exports.Swords = Swords;
  exports.Syringe = Syringe;
  exports.Table = Table;
  exports.Table2 = Table2;
  exports.TableProperties = TableProperties;
  exports.Tablet = Tablet;
  exports.Tablets = Tablets;
  exports.Tag = Tag;
  exports.Tags = Tags;
  exports.Tally1 = Tally1;
  exports.Tally2 = Tally2;
  exports.Tally3 = Tally3;
  exports.Tally4 = Tally4;
  exports.Tally5 = Tally5;
  exports.Target = Target;
  exports.Tent = Tent;
  exports.Terminal = Terminal;
  exports.TerminalSquare = TerminalSquare;
  exports.TestTube = TestTube;
  exports.TestTube2 = TestTube2;
  exports.TestTubes = TestTubes;
  exports.Text = Text;
  exports.TextCursor = TextCursor;
  exports.TextCursorInput = TextCursorInput;
  exports.TextQuote = TextQuote;
  exports.TextSelect = TextSelect;
  exports.Thermometer = Thermometer;
  exports.ThermometerSnowflake = ThermometerSnowflake;
  exports.ThermometerSun = ThermometerSun;
  exports.ThumbsDown = ThumbsDown;
  exports.ThumbsUp = ThumbsUp;
  exports.Ticket = Ticket;
  exports.Timer = Timer;
  exports.TimerOff = TimerOff;
  exports.TimerReset = TimerReset;
  exports.ToggleLeft = ToggleLeft;
  exports.ToggleRight = ToggleRight;
  exports.Tornado = Tornado;
  exports.Touchpad = Touchpad;
  exports.TouchpadOff = TouchpadOff;
  exports.TowerControl = TowerControl;
  exports.ToyBrick = ToyBrick;
  exports.Train = Train;
  exports.Trash = Trash;
  exports.Trash2 = Trash2;
  exports.TreeDeciduous = TreeDeciduous;
  exports.TreePine = TreePine;
  exports.Trees = Trees;
  exports.Trello = Trello;
  exports.TrendingDown = TrendingDown;
  exports.TrendingUp = TrendingUp;
  exports.Triangle = Triangle;
  exports.TriangleRight = TriangleRight;
  exports.Trophy = Trophy;
  exports.Truck = Truck;
  exports.Tv = Tv;
  exports.Tv2 = Tv2;
  exports.Twitch = Twitch;
  exports.Twitter = Twitter;
  exports.Type = Type;
  exports.Umbrella = Umbrella;
  exports.Underline = Underline;
  exports.Undo = Undo;
  exports.Undo2 = Undo2;
  exports.UndoDot = UndoDot;
  exports.UnfoldHorizontal = UnfoldHorizontal;
  exports.UnfoldVertical = UnfoldVertical;
  exports.Ungroup = Ungroup;
  exports.Unlink = Unlink;
  exports.Unlink2 = Unlink2;
  exports.Unlock = Unlock;
  exports.Unplug = Unplug;
  exports.Upload = Upload;
  exports.UploadCloud = UploadCloud;
  exports.Usb = Usb;
  exports.User = User;
  exports.User2 = User2;
  exports.UserCheck = UserCheck;
  exports.UserCheck2 = UserCheck2;
  exports.UserCircle = UserCircle;
  exports.UserCircle2 = UserCircle2;
  exports.UserCog = UserCog;
  exports.UserCog2 = UserCog2;
  exports.UserMinus = UserMinus;
  exports.UserMinus2 = UserMinus2;
  exports.UserPlus = UserPlus;
  exports.UserPlus2 = UserPlus2;
  exports.UserSquare = UserSquare;
  exports.UserSquare2 = UserSquare2;
  exports.UserX = UserX;
  exports.UserX2 = UserX2;
  exports.Users = Users;
  exports.Users2 = Users2;
  exports.Utensils = Utensils;
  exports.UtensilsCrossed = UtensilsCrossed;
  exports.UtilityPole = UtilityPole;
  exports.Variable = Variable;
  exports.Vegan = Vegan;
  exports.VenetianMask = VenetianMask;
  exports.Vibrate = Vibrate;
  exports.VibrateOff = VibrateOff;
  exports.Video = Video;
  exports.VideoOff = VideoOff;
  exports.Videotape = Videotape;
  exports.View = View;
  exports.Voicemail = Voicemail;
  exports.Volume = Volume;
  exports.Volume1 = Volume1;
  exports.Volume2 = Volume2;
  exports.VolumeX = VolumeX;
  exports.Vote = Vote;
  exports.Wallet = Wallet;
  exports.Wallet2 = Wallet2;
  exports.WalletCards = WalletCards;
  exports.Wallpaper = Wallpaper;
  exports.Wand = Wand;
  exports.Wand2 = Wand2;
  exports.Warehouse = Warehouse;
  exports.Watch = Watch;
  exports.Waves = Waves;
  exports.Webcam = Webcam;
  exports.Webhook = Webhook;
  exports.Wheat = Wheat;
  exports.WheatOff = WheatOff;
  exports.WholeWord = WholeWord;
  exports.Wifi = Wifi;
  exports.WifiOff = WifiOff;
  exports.Wind = Wind;
  exports.Wine = Wine;
  exports.WineOff = WineOff;
  exports.Workflow = Workflow;
  exports.WrapText = WrapText;
  exports.Wrench = Wrench;
  exports.X = X;
  exports.XCircle = XCircle;
  exports.XOctagon = XOctagon;
  exports.XSquare = XSquare;
  exports.Youtube = Youtube;
  exports.Zap = Zap;
  exports.ZapOff = ZapOff;
  exports.ZoomIn = ZoomIn;
  exports.ZoomOut = ZoomOut;
  exports.createElement = createElement$1;
  exports.createIcons = createIcons;
  exports.icons = allIcons;

}));
//# sourceMappingURL=lucide.js.map

FROM node

RUN npm install -g @angular/cli
CMD ng analytics off
RUN npm install -g n
RUN n 13.10.0
WORKDIR /projects
CMD apt-get update
CMD sudo apt-get install alsa-lib.x86_64 atk.x86_64 cups-libs.x86_64 gtk3.x86_64 ipa-gothic-fonts libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXrandr.x86_64 libXScrnSaver.x86_64 libXtst.x86_64pango.x86_64 xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 xorg-x11-utils
#CMD yum update nss -y
# Dockerのなかでinstallし直す
CMD yarn install && npm i && yarn serve

EXPOSE 4200 4201


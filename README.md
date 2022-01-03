# hardhat-workspace

sudo apt-get install -y android-tools-adb android-tools-fastboot autoconf \
        automake bc bison build-essential ccache codespell \
        cscope curl device-tree-compiler \
        expect flex ftp-upload gdisk iasl libattr1-dev libcap-dev \
        libfdt-dev libftdi-dev libglib2.0-dev libgmp-dev libhidapi-dev \
        libmpc-dev libncurses5-dev libpixman-1-dev libssl-dev libtool make \
        mtools netcat ninja-build python3-crypto \
        python3-pycryptodome python3-pyelftools python3-serial \
        rsync unzip uuid-dev xdg-utils xterm xz-utils zlib1g-dev


sudo apt-get remove python3-pycryptodome
## Andoroid repo install

```
mkdir ~/bin
PATH=~/bin:$PATH
```

## Andoroid repo tool Download

```
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

## Set Git account/password

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## OP-TEE source file Download

```
mkdir -p $HOME/devel/optee
cd $HOME/devel/optee
repo init -u https://github.com/OP-TEE/manifest.git -m rpi3.xml
repo init -u git clone https://github.com/OP-TEE/build.git -m rpi3.xml
repo sync
```

```
cd build
make -j2 toolchains
```

```
make
```

## toolchain

$ cd $HOME/toolchains

# Download 32bit toolchain

```
wget https://developer.arm.com/-/media/Files/downloads/gnu-a/8.2-2019.01/gcc-arm-8.2-2019.01-x86_64-arm-linux-gnueabi.tar.xz
mkdir aarch32
tar xf gcc-arm-8.2-2019.01-x86_64-arm-linux-gnueabi.tar.xz -C aarch32 --strip-components=1
```
# Download 64bit toolchain
```
wget https://developer.arm.com/-/media/Files/downloads/gnu-a/8.2-2019.01/gcc-arm-8.2-2019.01-x86_64-aarch64-linux-gnu.tar.xz
mkdir aarch64
tar xf gcc-arm-8.2-2019.01-x86_64-aarch64-linux-gnu.tar.xz -C aarch64 --strip-components=1
```
# 🌩️ Nimbus Framework

<p align="center">
  <img src="https://img.shields.io/badge/version-3.0.0-blue.svg?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/platform-Windows-0078D6.svg?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/.NET-4.0%2B-512BD4.svg?style=flat-square" alt=".NET Framework">
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License">
</p>

<p align="center">
  <b>A lightweight, XML-based WPF framework for building modern Windows desktop applications with Hot Reload, declarative logic, and zero compilation wait time.</b>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-examples">Examples</a>
</p>

---

## 🌟 Features

*   🔥 **Hot Reload** - Edit your XML and see UI/Logic changes instantly without restarting.
*   🛠️ **Built-in DevTools** - Browser-based inspector (localhost:9222) for state, logs, and debugging.
*   ⚡ **Declarative Logic** - Write application logic in XML (`<If>`, `<Loop>`, `<Set>`, `<Http>`).
*   📦 **Single EXE Build** - Compile your entire project into a standalone executable.
*   🎨 **Modern UI** - Includes Windows 11 style components (GlassCard, Acrylic, Mica).
*   🔌 **Plugin System** - Extend functionality with C# plugins (`.cs` files).
*   🚀 **Lightweight** - Runs on any Windows machine with .NET 4.0+.

---

## 📥 Installation

### Option 1: Build from Source
To use the framework, you need to compile the engine first.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/nimbus-framework.git
cd nimbus-framework

# 2. Build the engine (using C# Compiler)
csc /target:exe /out:nimbus.exe *.cs /reference:System.Xaml.dll /reference:WindowsBase.dll /reference:PresentationCore.dll /reference:PresentationFramework.dll

# 3. Add to PATH (Optional)
# Move nimbus.exe to a folder in your system PATH to use it globally.
```

### Option 2: Download Release
Download the latest binary from the [Releases Page](https://github.com/your-username/nimbus-framework/releases).

---

## 🚀 Quick Start

### 1. Create a Project
Create a new file named `App.xml`. This single file can contain your UI, Logic, and Styles.

```xml
<?xml version="1.0" encoding="utf-8"?>
<App Name="My First App" Width="600" Height="400" Theme="Dark">
    <UI>
        <Grid Background="#1E1E1E">
            <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">
                <TextBlock Text="Hello, Nimbus!" FontSize="32" Foreground="White" Margin="0,0,0,20"/>
                <Button Content="Click Me!" 
                        Background="#0078D4" Foreground="White" Padding="20,10"
                        onClick="OnButtonClick"/>
                <TextBlock Name="lblStatus" Text="" Foreground="#888" Margin="0,15,0,0"/>
            </StackPanel>
        </Grid>
    </UI>

    <Logic>
        <Handler Name="OnButtonClick">
            <Set Target="lblStatus" Property="Text" Value="You clicked the button!"/>
            <Toast Message="Welcome to Nimbus" Type="success"/>
        </Handler>
    </Logic>
</App>
```

### 2. Run the App
```bash
nimbus run App.xml
```

### 3. Develop with Hot Reload
```bash
nimbus dev App.xml
```
> This starts the DevTools server. Open `http://localhost:9222` in your browser to inspect variables and view logs.

---

## 📖 Documentation

### CLI Commands

| Command | Usage | Description |
| :--- | :--- | :--- |
| **Run** | `nimbus run <file>` | Runs the application normally. |
| **Dev** | `nimbus dev <file>` | Runs with Hot Reload and DevTools enabled. |
| **Build** | `nimbus build <file>` | Compiles the XML into a standalone `.exe`. |
| **New** | `nimbus new <name>` | Creates a new project structure. |

### Build Arguments

When building for production:

```bash
nimbus build App.xml --output ./dist --name MyApp --icon app.ico
```

*   `--output, -o`: Output directory (default: `build`)
*   `--name, -n`: Name of the executable.
*   `--icon, -i`: Path to .ico file.
*   `--console`: Keep console window (for debugging).

---

## 💡 Examples

### 1. Counter (State Management)
Demonstrates variables and arithmetic operations.

```xml
<App Name="Counter" Width="300" Height="200">
    <UI>
        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Name="txtCount" Text="0" FontSize="48" HorizontalAlignment="Center"/>
            <StackPanel Orientation="Horizontal" Margin="0,20,0,0">
                <Button Content="-" Width="40" onClick="Dec"/>
                <Button Content="+" Width="40" Margin="10,0,0,0" onClick="Inc"/>
            </StackPanel>
        </StackPanel>
    </UI>

    <Logic>
        <Var Name="count" Value="0" Type="int"/>

        <Handler Name="Inc">
            <Increment Var="count"/>
            <Set Target="txtCount" Property="Text" Value="{count}"/>
        </Handler>

        <Handler Name="Dec">
            <Decrement Var="count"/>
            <Set Target="txtCount" Property="Text" Value="{count}"/>
        </Handler>
    </Logic>
</App>
```

### 2. HTTP Request (API Integration)
Fetching data from a REST API.

```xml
<Handler Name="LoadData">
    <Set Target="lblStatus" Property="Text" Value="Loading..."/>
    
    <!-- Make GET request -->
    <HttpRequest Method="GET" 
                 Url="https://api.example.com/users" 
                 ToState="usersJson"/>
                 
    <If Condition="{usersJson} != ''">
        <Set Target="lblStatus" Property="Text" Value="Data Loaded!"/>
        <Plugin Name="JsonPlugin" Method="parse" Params="{usersJson}" ToState="users"/>
    </If>
</Handler>
```

### 3. Modal Dialogs & Control Flow

```xml
<Handler Name="DeleteItem">
    <Confirm Message="Are you sure you want to delete this file?" Title="Delete File">
        <Yes>
            <!-- User clicked Yes -->
            <Call Handler="PerformDelete"/>
            <Toast Message="File deleted" Type="success"/>
        </Yes>
        <No>
            <!-- User clicked No -->
            <Toast Message="Cancelled" Type="info"/>
        </No>
    </Confirm>
</Handler>
```

---

## 📂 Project Structure

For larger applications, we recommend the following structure:

```
MyProject/
├── App.xml             # Entry point
├── nimbus.json         # Project configuration
├── pages/              # UI Pages
│   ├── Home.xml
│   └── Settings.xml
├── components/         # Reusable UI components
│   └── Header.xml
├── assets/             # Images and Icons
└── plugins/            # C# Plugins
    └── MyPlugin.cs
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by the Nimbus Team
</p>

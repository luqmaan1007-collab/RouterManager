#include <iostream>
#include <string>
#include <cstdlib>

class RouterManager {
public:
    // Block a device from the internet using its MAC address
    void blockDevice(std::string macAddress) {
        std::string command = "iptables -I FORWARD -m mac --mac-source " + macAddress + " -j DROP";
        int result = std::system(command.c_str());
        
        if (result == 0) {
            std::cout << "SUCCESS: Device " << macAddress << " has been blocked." << std::endl;
        } else {
            std::cerr << "ERROR: Failed to block device. Are you root?" << std::endl;
        }
    }

    // Unblock a device
    void unblockDevice(std::string macAddress) {
        std::string command = "iptables -D FORWARD -m mac --mac-source " + macAddress + " -j DROP";
        std::system(command.c_str());
        std::cout << "SUCCESS: Device " << macAddress << " unblocked." << std::endl;
    }
};

int main() {
    RouterManager manager;
    
    // Example usage:
    // manager.blockDevice("A4:83:E7:12:34:56");
    
    return 0;
}


#include <stdio.h>
#include <stdlib.h>

/**
 * RouterManager: Device Discovery
 * Reads the Linux ARP cache to find connected clients.
 */
void discover_devices() {
    FILE *fp;
    char line[256];
    
    // The /proc/net/arp file contains all discovered devices on the network
    fp = fopen("/proc/net/arp", "r");
    if (fp == NULL) {
        perror("Could not open ARP cache");
        return;
    }

    printf("--- Connected Devices ---\n");
    printf("IP Address       HW Type   Flags     HW Address (MAC)    Device\n");

    // Skip the header line
    fgets(line, sizeof(line), fp);

    while (fgets(line, sizeof(line), fp)) {
        printf("%s", line);
    }

    fclose(fp);
}

int main() {
    discover_devices();
    return 0;
}


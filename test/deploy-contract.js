"use strict";
const { assert } = require('chai');
const { Client, Provider, ProviderRegistry, Result } = require('@blockstack/clarity');
describe("deploy contract test suite", () => {
    const provider = ProviderRegistry.createProvider();
    const poxLiteClient = new Client("ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.pox-lite", "pox-lite", provider);
    before(async () => {
    });
    it("should have a valid syntax", async () => {
        await poxLiteClient.checkContract();
    });
    it("should deploy", async () => {
        await poxLiteClient.deployContract();
    });
    it("deposit function should return", async () => {
        const tx = poxLiteClient.createTransaction({
            method: { name: "deposit", args: ["u100", "'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH", "none"] }
        });
        await tx.sign("ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH");
        const receipt = await poxLiteClient.submitTransaction(tx);
        console.log(receipt);
        assert.isTrue(receipt.success);
    });
    after(async () => {
        await provider.close();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LWNvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVwbG95LWNvbnRyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRXRGLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFFMUMsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsb0RBQW9ELEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTdHLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUMxQyxNQUFNLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDN0IsTUFBTSxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDOUMsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1lBQ3pDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ2xHLENBQUMsQ0FBQztRQUNILE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO1FBQzFELE1BQU0sT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDZixNQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=
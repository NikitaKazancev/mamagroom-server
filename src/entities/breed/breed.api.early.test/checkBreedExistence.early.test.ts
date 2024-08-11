// Unit tests for: checkBreedExistence

import { HttpException } from "@nestjs/common";

import { BreedAPI } from "../breed.api";

class MockBreedRepository {
  public findById = jest.fn();
}

describe("BreedAPI.checkBreedExistence() checkBreedExistence method", () => {
  let breedAPI: BreedAPI;
  let mockBreedRepository: MockBreedRepository;

  beforeEach(() => {
    mockBreedRepository = new MockBreedRepository();
    breedAPI = new BreedAPI(mockBreedRepository as any);
  });

  describe("Happy Path", () => {
    it("should return the breed when it exists", async () => {
      // Arrange
      const breedId = "123";
      const expectedBreed = { id: breedId, name: "Labrador" };
      mockBreedRepository.findById.mockResolvedValue(
        expectedBreed as any as never,
      );

      // Act
      const result = await breedAPI.checkBreedExistence(breedId);

      // Assert
      expect(result).toEqual(expectedBreed);
      expect(mockBreedRepository.findById).toHaveBeenCalledWith(breedId);
    });
  });

  describe("Edge Cases", () => {
    it("should throw an HttpException when the breed does not exist", async () => {
      // Arrange
      const breedId = "123";
      mockBreedRepository.findById.mockResolvedValue(null as any as never);

      // Act & Assert
      await expect(breedAPI.checkBreedExistence(breedId)).rejects.toThrow(
        HttpException,
      );
      await expect(breedAPI.checkBreedExistence(breedId)).rejects.toThrow(
        "Breed not found",
      );
      expect(mockBreedRepository.findById).toHaveBeenCalledWith(breedId);
    });

    it("should handle empty breedId gracefully", async () => {
      // Arrange
      const breedId = "";
      mockBreedRepository.findById.mockResolvedValue(null as any as never);

      // Act & Assert
      await expect(breedAPI.checkBreedExistence(breedId)).rejects.toThrow(
        HttpException,
      );
      await expect(breedAPI.checkBreedExistence(breedId)).rejects.toThrow(
        "Breed not found",
      );
      expect(mockBreedRepository.findById).toHaveBeenCalledWith(breedId);
    });

    it("should handle non-string breedId gracefully", async () => {
      // Arrange
      const breedId = 123; // Non-string input
      mockBreedRepository.findById.mockResolvedValue(null as any as never);

      // Act & Assert
      await expect(
        breedAPI.checkBreedExistence(breedId as any),
      ).rejects.toThrow(HttpException);
      await expect(
        breedAPI.checkBreedExistence(breedId as any),
      ).rejects.toThrow("Breed not found");
      expect(mockBreedRepository.findById).toHaveBeenCalledWith(breedId);
    });

    it("should handle repository errors gracefully", async () => {
      // Arrange
      const breedId = "123";
      mockBreedRepository.findById.mockRejectedValue(
        new Error("Repository error") as never,
      );

      // Act & Assert
      await expect(breedAPI.checkBreedExistence(breedId)).rejects.toThrow(
        "Repository error",
      );
      expect(mockBreedRepository.findById).toHaveBeenCalledWith(breedId);
    });
  });
});

// End of unit tests for: checkBreedExistence

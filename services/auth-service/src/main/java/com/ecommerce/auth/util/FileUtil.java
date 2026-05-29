package com.ecommerce.auth.util;

public final class FileUtil {

    private FileUtil() {
    }

    /**
     * Get file extension
     * Example:
     * image.png -> png
     */
    public static String getFileExtension(
            String fileName
    ) {

        if (fileName == null || !fileName.contains(".")) {

            return "";
        }

        return fileName.substring(
                fileName.lastIndexOf(".") + 1
        );
    }

    /**
     * Check image file
     */
    public static boolean isImageFile(
            String fileName
    ) {

        String extension =
                getFileExtension(fileName).toLowerCase();

        return extension.equals("jpg")
                || extension.equals("jpeg")
                || extension.equals("png")
                || extension.equals("gif")
                || extension.equals("webp");
    }

    /**
     * Check PDF file
     */
    public static boolean isPdfFile(
            String fileName
    ) {

        return getFileExtension(fileName)
                .equalsIgnoreCase("pdf");
    }

    /**
     * Generate unique filename
     */
    public static String generateFileName(
            String originalFileName
    ) {

        String extension =
                getFileExtension(originalFileName);

        return java.util.UUID.randomUUID()
                + "." + extension;
    }
}
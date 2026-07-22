package com.aurorapm.organization.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public final class SlugGenerator {

  private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
  private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

  private SlugGenerator() {}

  public static String toSlug(String input) {
    String normalized =
        Normalizer.normalize(input.trim(), Normalizer.Form.NFD)
            .replaceAll("\\p{M}", "")
            .toLowerCase(Locale.ROOT);
    String slug = WHITESPACE.matcher(normalized).replaceAll("-");
    slug = NON_LATIN.matcher(slug).replaceAll("");
    slug = slug.replaceAll("-{2,}", "-").replaceAll("^-|-$", "");
    return slug.isBlank() ? "organization" : slug;
  }
}

package com.aurorapm.organization.entity;

import com.aurorapm.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "organizations")
public class Organization extends BaseEntity {

  @Column(nullable = false, length = 200)
  private String name;

  @Column(nullable = false, unique = true, length = 100)
  private String slug;

  @Column(name = "logo_url", length = 500)
  private String logoUrl;

  @Column(nullable = false, length = 50)
  private String timezone = "UTC";

  @Column(nullable = false, length = 20)
  private String status = "ACTIVE";
}

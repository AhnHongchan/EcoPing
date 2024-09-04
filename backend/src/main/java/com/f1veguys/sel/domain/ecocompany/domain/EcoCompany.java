package com.f1veguys.sel.domain.ecocompany.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "eco_company")
public class EcoCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private int id;

    @Column(name = "company_name")
    private String name;
}
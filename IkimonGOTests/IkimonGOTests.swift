//
//  IkimonGOTests.swift
//  IkimonGOTests
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import XCTest
@testable import IkimonGO

class LoginDataStoreTests: XCTestCase {
    let loginDataStore: LoginDataStoreProtocol = LoginDataStore()

    func testGetAccessToken() {
        loginDataStore.getAccessToken(email: "test@test.com", password: "testtest")
        XCTAssertTrue(true)
    }
}

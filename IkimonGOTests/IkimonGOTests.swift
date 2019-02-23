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
    let recordDataStore: RecordDataStoreProtocol = RecordDataStore()
    var loginStatus: LoginStatus?

    func testGetAccessToken() {
        let _ = loginDataStore.getAccessToken(email: "test@test.com", password: "testtest").subscribe(onNext: { [weak self] (loginStatus) in
                    guard let self = self else { return }
                    self.loginStatus = loginStatus
                    XCTAssertTrue(true)
                }, onError: nil, onCompleted: nil, onDisposed: nil)
    }
    
    func testGetRecords() {
        guard let loginStatus = loginStatus else { return }
        let _ = recordDataStore.getMyRecords(with: loginStatus.accessToken).subscribe(onNext: { (records) in
                    print(records)
                    XCTAssertTrue(true)
                }, onError: { (error) in
                    XCTAssertTrue(false)
                }, onCompleted: nil, onDisposed: nil)
    }
}

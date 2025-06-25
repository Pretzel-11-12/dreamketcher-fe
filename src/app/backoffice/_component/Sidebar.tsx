'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faChartPie,
  faFlag,
  faHistory,
  faBook,
  faCheckCircle,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      {/* 실제 공간을 차지하는 더미 요소 */}
      <div className={`invisible ${sidebarOpen ? 'w-64' : 'w-16'}`}></div>

      {/* fixed 포지션의 실제 사이드바 */}
      <aside
        className={`fixed top-[70px] left-0 bg-[#2F3D5C] text-white transition-all duration-300 shadow-lg h-screen z-10 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="py-4 flex justify-end w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-[#3A4D80] !rounded-button whitespace-nowrap"
          >
            <FontAwesomeIcon
              icon={sidebarOpen ? faTimes : faBars}
              className=" w-5 text-center"
            />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem-70px)]">
          <nav className="p-2">
            <div className="p-2 flex flex-col space-y-1 border border-black rounded-md shadow-md">
              <Button
                variant={activePage === 'dashboard' ? 'secondary' : 'ghost'}
                className={`w-full justify-start text-left !rounded-button whitespace-nowrap`}
                onClick={() => setActivePage('dashboard')}
              >
                <FontAwesomeIcon
                  icon={faChartPie}
                  className="mr-3 w-5 text-center"
                />
                {sidebarOpen && <span>대시보드</span>}
              </Button>

              <div className="pt-2 pb-1">
                {sidebarOpen && (
                  <div className="text-xs text-gray-400 px-3 py-1">
                    작품 관리
                  </div>
                )}
                {!sidebarOpen && (
                  <div className="border-t border-gray-700 my-2"></div>
                )}
              </div>

              <Button
                variant={activePage === 'webtoonList' ? 'secondary' : 'ghost'}
                className={`w-full justify-start text-left !rounded-button whitespace-nowrap`}
                onClick={() => setActivePage('webtoonList')}
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="mr-3 w-5 text-center"
                />
                {sidebarOpen && <span>웹툰 목록</span>}
              </Button>

              <Button
                variant={
                  activePage === 'approvalManagement' ? 'secondary' : 'ghost'
                }
                className={`w-full justify-start text-left !rounded-button whitespace-nowrap`}
                onClick={() => setActivePage('approvalManagement')}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mr-3 w-5 text-center"
                />
                {sidebarOpen && <span>작품 승인 관리</span>}
              </Button>

              <div className="pt-2 pb-1">
                {sidebarOpen && (
                  <div className="text-xs text-gray-400 px-3 py-1">
                    신고 관리
                  </div>
                )}
                {!sidebarOpen && (
                  <div className="border-t border-gray-700 my-2"></div>
                )}
              </div>

              <Button
                variant={
                  activePage === 'reportManagement' ? 'secondary' : 'ghost'
                }
                className={`w-full justify-start text-left !rounded-button whitespace-nowrap`}
                onClick={() => setActivePage('reportManagement')}
              >
                <FontAwesomeIcon
                  icon={faFlag}
                  className="mr-3 w-5 text-center"
                />
                {sidebarOpen && <span>신고 관리</span>}
              </Button>

              <div className="pt-2 pb-1">
                {sidebarOpen && (
                  <div className="text-xs text-gray-400 px-3 py-1">
                    회원 관리
                  </div>
                )}
                {!sidebarOpen && (
                  <div className="border-t border-gray-700 my-2"></div>
                )}
              </div>

              <Button
                variant={
                  activePage === 'memberManagement' ? 'secondary' : 'ghost'
                }
                className={`w-full justify-start text-left !rounded-button whitespace-nowrap`}
                onClick={() => setActivePage('memberManagement')}
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="mr-3 w-5 text-center"
                />
                {sidebarOpen && <span>회원 관리</span>}
              </Button>

              <div className="pt-2 pb-1">
                {sidebarOpen && (
                  <div className="text-xs text-gray-400 px-3 py-1">시스템</div>
                )}
                {!sidebarOpen && (
                  <div className="border-t border-gray-700 my-2"></div>
                )}
              </div>

              <Button
                variant={activePage === 'logManagement' ? 'secondary' : 'ghost'}
                className={`w-full justify-start text-left !rounded-button whitespace-nowrap`}
                onClick={() => setActivePage('logManagement')}
              >
                <FontAwesomeIcon
                  icon={faHistory}
                  className="mr-3 w-5 text-center"
                />
                {sidebarOpen && <span>로그 관리</span>}
              </Button>
            </div>
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}

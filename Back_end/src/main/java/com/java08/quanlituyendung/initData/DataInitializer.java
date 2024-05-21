package com.java08.quanlituyendung.initData;

import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.repository.*;
import com.java08.quanlituyendung.service.impl.QuestionServiceIml;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Component
public class DataInitializer implements CommandLineRunner {
    private final UserAccountRepository userAccountRepository;
    private final UserInfoRepository userInfoRepository;
    private final CompanyRepository companyRepository;
    private final JobPostingRepository jobPostingRepository;
    private final EventRepository eventRepository;
    private final InterviewRepository interviewRepository;
    private final CvRepository cvRepository;
    private final SkillRepository skillRepository;
    private final PositionRepository positionRepository;
    private final QuestionRepository questionRepository;
    private final QuestionServiceIml questionServiceIml;
    private final BlackListRepository blackListRepository;
    private final InterviewDetailRepository interviewDetailRepository;

    public DataInitializer(UserAccountRepository userAccountRepository, UserInfoRepository userInfoRepository, CompanyRepository companyRepository, JobPostingRepository jobPostingRepository, EventRepository eventRepository, InterviewRepository interviewRepository, CvRepository cvRepository, SkillRepository skillRepository, PositionRepository positionRepository, QuestionRepository questionRepository, QuestionServiceIml questionServiceIml, BlackListRepository blackListRepository, InterviewDetailRepository interviewDetailRepository) {
        this.userAccountRepository = userAccountRepository;
        this.userInfoRepository = userInfoRepository;
        this.companyRepository = companyRepository;
        this.jobPostingRepository = jobPostingRepository;
        this.eventRepository = eventRepository;
        this.interviewRepository = interviewRepository;
        this.cvRepository = cvRepository;
        this.skillRepository = skillRepository;
        this.positionRepository = positionRepository;
        this.questionRepository = questionRepository;
        this.questionServiceIml = questionServiceIml;
        this.blackListRepository = blackListRepository;
        this.interviewDetailRepository = interviewDetailRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!userAccountRepository.existsByEmail("admin@gmail.com")) {
            GenerateUser();
            GenerateSkillPosition();
            GenerateQuestions();
            System.out.println("Dữ liệu đã được khởi tạo thành công!");

        } else {
            System.out.println("Dữ liệu đã được khởi tạo thành công!");
        }
    }

    public void GenerateUser() {
        var admin = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("admin@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.ADMIN)
                .status(Status.INPROCESS)
                .state(UserAccountEntity.State.ACTIVE)
                .username("admin")
                .build();
        var reccer1 = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("reccer1@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.RECRUITER)
                .status(Status.INPROCESS)
                .state(UserAccountEntity.State.ACTIVE)
                .username("reccer1")
                .build();
        var reccer2 = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("reccer2@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.RECRUITER)
                .status(Status.INPROCESS)
                .state(UserAccountEntity.State.ACTIVE)
                .username("recccer2")
                .build();
        var interviewer1 = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("interviewer1@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.INTERVIEWER)
                .status(Status.INPROCESS)
                .state(UserAccountEntity.State.ACTIVE)
                .username("interviewer1")
                .reccerId(2L)
                .build();
        var interviewer2 = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("interviewer2@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.INTERVIEWER)
                .status(Status.INPROCESS)
                .state(UserAccountEntity.State.ACTIVE)
                .username("interviewer2")
                .reccerId(3L)
                .build();
        var candidate = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("johndoe@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.CANDIDATE)
                .status(Status.INPROCESS)
                .state(UserAccountEntity.State.ACTIVE)
                .username("candidate")
                .build();
        var backlistUser = UserAccountEntity.builder()
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .email("blacklist@gmail.com")
                .password("$2a$10$zuZ.0a0OYWNA9nqc6mu5CuuySyvvrIf7CjnWot1Bez.QQowsg.Nhi")
                .role(Role.CANDIDATE)
                .status(Status.BLACKLIST)
                .state(UserAccountEntity.State.ACTIVE)
                .username("candidate")
                .build();
        var adminInfo = UserInfoEntity.builder()
                .userAccountInfo(admin)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("416 Lã Xuân Oai, Long Trường, quận 9, TP.HCM")
                .fullName("Nguyễn Admin")
                .gender(Gender.MALE)
                .phone("012334488")
                .build();
        var reccer1Info = UserInfoEntity.builder()
                .userAccountInfo(reccer1)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("59 Đường 379 Tăng Nhơn Phú A, quận 9, TP.HCM")
                .fullName("Nguyễn Reccer1")
                .gender(Gender.MALE)
                .phone("012365488")
                .build();
        var reccer2Info = UserInfoEntity.builder()
                .userAccountInfo(reccer2)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("20 Đường 379 Tăng Nhơn Phú A, quận 9, TP.HCM")
                .fullName("Nguyễn Reccer1")
                .gender(Gender.MALE)
                .phone("012334238")
                .build();
        var interviewer1Info = UserInfoEntity.builder()
                .userAccountInfo(interviewer1)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("21 Đường 379 Tăng Nhơn Phú A, quận 9, TP.HCM")
                .fullName("Nguyễn Interviewer1")
                .gender(Gender.MALE)
                .phone("012334238")
                .build();
        var interviewer2Info = UserInfoEntity.builder()
                .userAccountInfo(interviewer2)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("22 Đường 379 Tăng Nhơn Phú A, quận 9, TP.HCM")
                .fullName("Nguyễn Interviewer2")
                .gender(Gender.MALE)
                .phone("012334238")
                .build();
        var candidateInfo = UserInfoEntity.builder()
                .userAccountInfo(candidate)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("416 Lã Xuân Oai, Long Trường, quận 9, TP.HCM")
                .fullName("Nguyen Do")
                .gender(Gender.MALE)
                .phone("012334488")
                .build();
        var blacklistUserInfo = UserInfoEntity.builder()
                .userAccountInfo(backlistUser)
                .avatar("https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fhinh1.jpg?alt=media&token=c16bc73f-a3be-4c01-9f26-5a0d4ccad233")
                .address("22 Lã Xuân Oai, Long Trường, quận 9, TP.HCM")
                .fullName("Nguyễn Blacklist")
                .gender(Gender.MALE)
                .phone("012334488")
                .build();
        userInfoRepository.save(adminInfo);
        userInfoRepository.save(reccer1Info);
        userInfoRepository.save(reccer2Info);
        userInfoRepository.save(interviewer1Info);
        userInfoRepository.save(interviewer2Info);
        userInfoRepository.save(candidateInfo);
        userInfoRepository.save(blacklistUserInfo);
        GenerateRateCompany(reccer1, reccer2);
        GenerateJob(interviewer1,reccer1, reccer2, candidate);
        GenerateEvent(reccer1);
        GenerateBlackList(backlistUser);
    }

    public void GenerateRateCompany(UserAccountEntity reccer1, UserAccountEntity reccer2) {
        var company1 = CompanyEntity.builder()
                .address("Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ")
                .avatar("https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fcong-ty-tnhh-buymed-f95dc7cac15325af4367f3c8cf5ee0f6-5ff7dd182c9d8.jpg?alt=media&token=31f94198-61ac-4e6a-896b-3a94017bbcd7")
                .info("thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế")
                .name("CÔNG TY TNHH BUYMED")
                .phone("0123456776")
                .website("https://thuocsi.vn/")
                .userId(reccer1.getId())
                .build();
        var companyKinhTe = CompanyEntity.builder()
                .address("Tầng 3 TTTM, tòa nhà CTM Complex, số 139 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội")
                .avatar("https://static.topcv.vn/company_covers/cong-ty-tnhh-kin-long-viet-nam-211e12c68ebec40e7a3395b793500466-65421fc34c31c.jpg")
                .info("Kin Long là một doanh nghiệp quy mô lớn trong ngành ngũ kim Trung Quốc, là công ty chuyên nghiệp tham gia vào lĩnh vực nghiên cứu, chế tạo và phân phối các sản phẩm ngũ kim chất lượng cao.")
                .name("CÔNG TY TNHH KIN LONG VIỆT NAM")
                .phone("0987654321")
                .website("https://kinlong.vn/")
                .userId(reccer2.getId())
                .build();
        companyRepository.save(company1);
        companyRepository.save(companyKinhTe);
    }

    public void GenerateJob(UserAccountEntity interviewer1, UserAccountEntity reccer1, UserAccountEntity reccer2, UserAccountEntity candidate) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        var job1 = JobPostingEntity.builder()
                .userAccountEntity(reccer1)
                .name("Java Developer (SpringBoot/Struts)")
                .position("Nhân viên")
                .language("TOEIC 700")
                .location("Hồ Chí Minh")
                .salary("thỏa thuận")
                .number("10")
                .workingForm("Toàn thời gian")
                .sex("Không yêu cầu")
                .experience("1 năm")
                .detailLocation("Số 1 Võ Văn Ngân, Thủ Đức")
                .detailJob("Tham gia các dự án sử dụng ngôn ngữ lập trình Java cùng framework SpringBoot/Struts và các công nghệ liên quan cho các khách hàng đến từ Nhật Bản.\n" +
                        "Phân tích thiết kế và lập trình chức năng của các website.\n" +
                        "Làm các công việc khác theo sự phân công của quản lý")
                .requirements("Yêu cầu cơ bản:  \n" +
                        "\n" +
                        "Tốt nghiệp đại học chuyên ngành IT  \n" +
                        "Thao tác tốt Spring, Hibernate, Struts 2, HTML, CSS. (Struts 2 nếu chưa biết sẽ được đào tạo). \n" +
                        "Ham học hỏi và khả năng tự học và hiểu các framework. Khuyến khích khả năng làm độc lập trong dự án. \n" +
                        "Có tư duy và giải thuật tốt    \n" +
                        "Có kinh nghiệm làm việc với AWS là một lợi thế    \n" +
                        "Hiểu biết về MVC Framework, ORM, RESTful, OOP, Design Pattern    \n" +
                        "Có kinh nghiệm làm việc với MySQL hoặc NoSQL (MongoDB)    \n" +
                        "Thành thạo các công cụ quản lý mã nguồn: GIT, SVN    \n" +
                        "Sẵn sàng học hỏi và đáp ứng nhanh các yêu cầu của dự án  \n" +
                        "Yêu cầu chuyên môn: \n" +
                        "\n" +
                        "Viết code rõ ràng, dễ hiểu, dễ maintain, tuân thủ chặt chẽ convention \n" +
                        "Tương tác với nhiều resources, nhiều dạng database là lợi thế.  \n" +
                        "Viết SQL tối ưu, không bị SQL Injection là lợi thế ")
                .interest("Mức lương khởi điểm hấp dẫn, cạnh tranh, tương xứng với năng lực và kinh nghiệm làm việc; \n" +
                        "Thu nhập: 13 tháng lương/năm + thưởng dự án, thưởng Tết và các dịp lễ...; \n" +
                        "Xét tăng lương 2 lần/năm theo năng lực và hiệu quả công việc; \n" +
                        "Lương làm thêm giờ theo luật lao động, hỗ trợ đồ ăn OT theo quy định công ty; \n" +
                        "Làm việc từ thứ 2 - thứ 6 (8h30 - 17h30); \n" +
                        "Được tham gia BHXH, BHYT, BHTN theo quy định của pháp luật hiện hành; \n" +
                        "Bảo hiểm chăm sóc sức khỏe 24/24 (Bảo Việt); \n" +
                        "Khám sức khỏe định kỳ 1 năm/1 lần tại bệnh viện Đại học Y Hà Nội; \n" +
                        "Nghỉ ốm hưởng nguyên lương tối đa 30 ngày/ năm (có giấy chứng nhận của bệnh viện); \n" +
                        "Trợ cấp tiếng Nhật và các chứng chỉ IT liên quan (từ 1000.000 VNĐ - 2.500.000 VNĐ/tháng); \n" +
                        "Phụ cấp thâm niên; phụ cấp chức vụ; \n" +
                        "Được tham gia các câu lạc bộ của công ty: CLB Bóng đá, CLB Game, CLB Beauty,  CLB Dance... \n" +
                        "Được tham gia các hoạt động tập thể sôi động của công ty: nghỉ mát hàng năm, teambuilding hàng quý, gala cuối năm...\n" +
                        "Tham gia các khóa học nâng cao trình độ chuyên môn qua Portal đào tạo nội bộ hoặc các khóa học trực tiếp với các giảng viên uy tín.  \n" +
                        "Cơ hội làm việc và đào tạo tại Nhật Bản với các ứng viên có tiếng Nhật \n" +
                        "Làm việc trong môi trường chuyên nghiệp, được hỗ trợ phát huy khả năng, phát triển công việc tối đa.")
                .image("https://cdn-new.topcv.vn/unsafe/150x/filters:format(webp)/https://static.topcv.vn/company_logos/hgTiOn9OZKDjJfARGkwrqczYVDkWC2it_1673406018____c31b182fa12ed20bae653cad41e00185.jpg")
                .status(true)
                .createDate(sdf.format(java.sql.Date.valueOf(LocalDate.now())))
                .build();
        var job2 = JobPostingEntity.builder()
                .userAccountEntity(reccer1)
                .name("Senior React JS")
                .position("Nhân viên")
                .language("TOEIC 700")
                .location("Hồ Chí Minh")
                .salary("30 -50 triệu")
                .number("2")
                .workingForm("Toàn thời gian")
                .sex("Không yêu cầu")
                .experience("4 năm")
                .detailLocation("Hồ Chí Minh: Tòa nhà Bitexco Financial Tower, 2 Hải Triều, quận 1, TPHCM")
                .detailJob("Tham gia phát triển dự án sử dụng Reactjs, Nextjs, Tailwind Css, Typescript...\n" +
                        "Tham gia vào việc phân tích nghiệp vụ, nghiên cứu giải pháp tối ưu hoá hiệu suất cho sản phẩm.\n" +
                        "Quản lí chi tiết công việc: review code, đảm bảo chất lượng code, security và tuân thủ tiêu chuẩn code\n" +
                        "Lead team, support team cùng hợp tác, phát triển")
                .requirements("Tối thiểu 4 năm kinh nghiệm trong lập trình front-end.\n" +
                        "Tham gia phát triển dự án sử dụng Reactjs, Nextjs, Tailwind Css, Typescript...\n" +
                        "Tham gia vào việc phân tích nghiệp vụ, nghiên cứu giải pháp tối ưu hoá hiệu suất cho sản phẩm.\n" +
                        "Có kiến thức cơ bản và khả năng sử dụng HTML, CSS, Javascript\n" +
                        "Hiểu biết sâu sắc về các tiêu chuẩn và thông số kỹ thuật thiết kế HTTP\n" +
                        "Hiểu biết về tính bảo mật của API OAuth 2.0.\n" +
                        "Quen thuộc với JSON, RESTful APIs.\n" +
                        "Có khả năng lãnh đạo, hỗ trợ thúc đẩy team cùng phát triển\n" +
                        "Hiểu biết sâu sắc về kiến trúc hệ thống và khả năng đưa ra các quyết định cho kiến trúc hệ thống\n" +
                        "Kinh nghiệm vể review code, đảm bảo chất lượng code, security và tuân thủ tiêu chuẩn code\n" +
                        "Kỹ năng giải quyết vấn đề mạnh mẽ và khả năng nghiên cứu và khám phá các giải pháp sáng tạo cho những thách thức kỹ thuật phức tạp.\n" +
                        "Có kinh nghiệm sử dụng các công cụ phát triển front-end như Webpack, NPM, Yarn, v.v\n" +
                        "Khả năng tài liệu hóa sơ đồ và tổ chức thiết kế và cơ chế\n" +
                        "Trải nghiệm công cụ cộng tác sử dụng Git, Jira và Confluence\n" +
                        "Kinh nghiệm phát triển trong môi trường đám mây như AWS hoặc Azure\n" +
                        "Từng làm việc với các dự án android/ios native là một lợi thế")
                .interest("Salary: từ 1300$ (thỏa thuận khi phỏng vấn)\n" +
                        "Review lương hàng năm.\n" +
                        "Thời gian làm việc: T2-T6 (9h-18h). Không OT.\n" +
                        "13 tháng lương/năm, thưởng Lễ tết, thưởng performance...\n" +
                        "12 ngày phép/năm.\n" +
                        "Môi trường làm việc trẻ trung, năng động, thân thiện.\n" +
                        "Được tạo điều kiện để học hỏi và phát triển mỗi ngày.\n" +
                        "Được hưởng đầy đủ các chế độ theo quy định của pháp luật (BHYT, BHXH, BHTN).\n" +
                        "Được tham gia vào các hoạt động: du lịch hàng năm, team building theo quý, Party, sinh nhật hàng tháng...\n" +
                        "Happy time hàng ngày; trà, coffee, hoa quả free...\n" +
                        "Được hưởng đầy đủ các chế độ thăm hỏi sức khỏe cho bản thân và gia đình theo chính sách đãi ngộ của Công ty.")
                .image("https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-tnhh-concentrix-service-vietnam-a963cac26074348bc95ce4bf90dc9fb1-6423dfbc43963.jpg")
                .status(true)
                .createDate(sdf.format(java.sql.Date.valueOf(LocalDate.now())))
                .build();

        var jobKinhTe = JobPostingEntity.builder()
                .userAccountEntity(reccer2) // Thay userOfYourCompany bằng thông tin tài khoản người dùng liên quan
                .name("Nhân Viên Kinh Doanh Tiếng Trung Tại Hà Nội")
                .position("Nhân viên")
                .language("Tiếng Trung")
                .location("Hà Nội")
                .salary("thỏa thuận")
                .number("1")
                .workingForm("Toàn thời gian")
                .sex("Không yêu cầu")
                .experience("chưa có")
                .detailLocation("Tầng 3 TTTM, tòa nhà CTM Complex, số 139 Cầu Giấy")

                .detailJob("- Tìm hiểu, nghiên cứu các sản phẩm về phụ kiện xây dựng của công ty để giới thiệu, tư vấn giải pháp cho khách hàng ( hệ thống sản phẩm: phụ kiện khóa từ vân tay, khóa cửa gỗ, bu lông, tấm alu, sàn gỗ nhựa, đèn LED, hệ thống sản phẩm hoàn thiện nội thất ...)\n" +
                        "\n" +
                        "- Đàm phán điều khoản, ký kết hợp đồng kinh doanh với khách hàng\n" +
                        "\n" +
                        "- Khai thác, tìm kiếm khách hàng mới .Phát triển tiêu thụ sản phẩm tại thị trường Việt Nam\n" +
                        "\n" +
                        "- Khai thác và hợp tác với các công ty thương mại –phân phối\n" +
                        "\n" +
                        "- Quản lý hoạt động kinh doanh và chăm sóc khách hàng\n" +
                        "\n" +
                        "- Thực hiện các công việc khác liên quan đến quá trình kinh doanh theo sự phân công của cấp trên ( học tập kiến thức sản phẩm, điều tra thị trường, tiếp cận dự án... )")
                .requirements("- Ưu tiên ứng viên có kinh nghiệm trong ngành xây dựng, không có kinh nghiệm sẽ được đào tạo;\n" +
                        "\n" +
                        "- Nam độ tuổi từ 30 trở xuống; Trình độ Cao đẳng trở lên;\n" +
                        "\n" +
                        "- Ưu tiên biết tiếng Trung\n" +
                        "\n" +
                        "- Kỹ năng đàm phán, thương lượng;\n" +
                        "\n" +
                        "- Yêu thích công việc kinh doanh;\n" +
                        "\n" +
                        "- Có khả năng làm việc độc lập, phối hợp làm việc nhóm\n" +
                        "\n" +
                        "- Chịu được áp lực công việc.\n" +
                        "\n" +
                        "- Trung thực, chịu khó")
                .interest("- Lương hấp dẫn: Lương cơ bản 8-10 triệu tùy năng lực + hoa hồng ko giới hạn\n" +
                        "\n" +
                        "- Lương thử việc được trả 100%, thời gian thử việc được tính nghỉ phép\n" +
                        "\n" +
                        "- Phụ cấp tiền ăn trưa, xăng xe, chi phí liên lạc điện thoại\n" +
                        "\n" +
                        "- Được hưởng các chế độ thưởng chuyên cần, thưởng hiệu suất làm việc, thưởng thâm niên công tác...\n" +
                        "\n" +
                        "- Xét tăng lương 1 lần / năm theo quy định của công ty\n" +
                        "\n" +
                        "- Được tham gia BHYT + BHXH + BHTN và các chế độ phúc lợi xã hội khác theo luật lao động Việt Nam\n" +
                        "\n" +
                        "- Được hưởng chế độ nghỉ Lễ, tết theo quy định của Luật Lao động và Quy định của công ty.\n" +
                        "\n" +
                        "- Được làm việc trong môi trường năng động, chuyên nghiệp, được cử sang nước ngoài đào tạo\n" +
                        "\n" +
                        "- Được tham gia các hoạt động chung của Công ty: du lịch, teambuilding, sự kiện.........")
                .image("https://static.topcv.vn/employer_medias/301e1c35751c47cbd642b7688a0e2d37-654223f13e101.jpg")
                .status(true)
                .createDate(sdf.format(java.sql.Date.valueOf(LocalDate.now())))
                .build();

        var jobKinhTe2 = JobPostingEntity.builder()
                .userAccountEntity(reccer2) // Thay userOfYourCompany bằng thông tin tài khoản người dùng liên quan
                .name("Giáo Viên Tiếng Anh Online")
                .position("Thực tập sinh")
                .language("Tiếng Trung")
                .location("Hà Nội")
                .salary("Dưới 10 triệu")
                .number("20")
                .workingForm("Toàn thời gian")
                .sex("Không yêu cầu")
                .experience("chưa có")
                .detailLocation("Toà nhà Comatce, 61 P.Ngụy Như Kon Tum, Nhân Chính, Thanh Xuân, Hà Nội")

                .detailJob("- Giảng dạy cho học sinh độ tuổi từ 5-14 về phát âm, ngữ pháp, từ vựng theo học liệu được biên soạn sẵn từ Edupia (bám sát chương trình của Bộ Giáo Dục)\n" +
                        "\n" +
                        "- Mô hình lớp: 2 học sinh, giảng dạy online qua phần mềm classin\n" +
                        "\n" +
                        "- Tham gia các hoạt động phong trào, lễ tết cùng hơn 600 gia sư năng động, trẻ trung đang làm việc tại hệ thống.\n" +
                        "\n" +
                        "- Tham gia các buổi đào tạo trực tuyến, nâng cao kỹ năng sư phạm.")
                .requirements("- Ứng viên từ 19-35 tuổi, có khả năng giao tiếp tiếng Anh tốt, phát âm chuẩn.\n" +
                        "\n" +
                        "- Có chứng chỉ tiếng Anh hoặc là sinh viên khoa sư phạm tiếng Anh là một lợi thế\n" +
                        "\n" +
                        "- Có kinh nghiệm gia sư, trợ giảng là lợi thế.\n" +
                        "\n" +
                        "- Có đam mê giảng dạy và định hướng gắn bó lâu dài với công việc (từ 6 tháng trở lên).\n" +
                        "\n" +
                        "- Có máy tính đảm bảo kết nối Internet tốt, camera, mic tốt phục vụ cho việc giảng dạy trực tuyến.\n" +
                        "\n" +
                        "- Làm việc tối thiểu 15 ca/tuần (45'/ca) các buổi tối thứ 2-CN, từ 18h-21h45, đặc biệt có thể làm các ca tối cuối tuần.")
                .interest("- Thu nhập: lương khởi điểm 50-65k/ca 45', tương đương trung bình 66-87k/h bao gồm lương cứng và thưởng tuỳ vị trí (tổng thu nhập dao động từ 3tr - 11tr/tháng)\n" +
                        "\n" +
                        "- Mức lương cao hơn 20% - 50% công ty cùng ngành\n" +
                        "\n" +
                        "- Đánh giá tăng lương định kỳ, mức max nhận được 115k/ca 45'\n" +
                        "\n" +
                        "- Đăng ký theo lịch rảnh cá nhân\n" +
                        "\n" +
                        "- Cùng học sinh tạo ra các lớp học với trải nghiệm, đào tạo E-learning chuẩn thế kỷ 21 \"Đem thế giới vào lớp học và kết nối lớp học với cuộc sống\"\n" +
                        "\n" +
                        "- Được làm việc trong môi trường chuyên nghiệp và đội ngũ quản lý có kinh nghiệm và trình độ cao trong lĩnh vực giáo dục.\n" +
                        "\n" +
                        "- Educa luôn tạo cơ hội để các bạn ham học hỏi và phát triển bản thân, đồng thời đánh giá công bằng năng lực của ứng viên.\n" +
                        "\n" +
                        "- Làm việc trên 6 tháng sẽ được cấp chứng nhận giảng dạy tại trung tâm (có hỗ trợ dấu thực tập sau 6 tháng)")
                .image("https://static.topcv.vn/employer_medias/d0174e67d5e2154738ca475ad8a1d450-6513923c776fd.jpg")
                .status(true)
                .createDate(sdf.format(java.sql.Date.valueOf(LocalDate.now())))
                .build();


        jobPostingRepository.save(job1);
        jobPostingRepository.save(job2);
        jobPostingRepository.save(jobKinhTe);
        jobPostingRepository.save(jobKinhTe2);

        GenerateInterview(interviewer1,reccer1, job1, reccer2, jobKinhTe);
        GenerateCV(candidate, job1);


    }


    public void GenerateEvent(UserAccountEntity reccer1) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        var event = EventEntity.builder()
                .article("Sự kiện nổi bật xuyên suốt hàng năm, với mục tiêu kết nối sinh viên trường Đại học Sư phạm kỹ thuật TPHCM với các doanh nghiệp")
                .content("cơ hội việc làm cho sinh viên sắp ra trường")
                .image("https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/files%2Fbackground-%C4%91%E1%BA%B9p-hoa-b%C6%B0%C6%A1m-b%C6%B0%E1%BB%9Bm.jpg?alt=media&token=4361512c-e308-40b4-8e9a-c194932d4e66")
                .name("JOB FAIR tại Đại học sư phạm kỹ thuật Tp Hồ Chí Minh")
                .status(true)
                .time(sdf.format(java.sql.Date.valueOf(LocalDate.now())))
                .userAccountEntity(reccer1)
                .build();
        eventRepository.save(event);
    }

    public void GenerateInterview(UserAccountEntity interviewer1, UserAccountEntity reccer1, JobPostingEntity job1, UserAccountEntity reccer2, JobPostingEntity job2) {

        List<UserAccountEntity> listInterview = new ArrayList<>();
        listInterview.add(interviewer1);
        var interview1 = InterviewEntity.builder()
                .description("vòng 1 technical")
                .endDate("2023-12-12T09:00")
                .linkmeet("")
                .roomName("phòng 1")
                .skill("Springboot")
                .startDate("2023-12-10T08:00")
                .status("Created")
                .jobPostingEntity(job1)
                .userAccountEntity(reccer1)
                .interviewers(listInterview)
                .build();

        var interview2 = InterviewEntity.builder()
                .description("vòng 1 tiếng Anh")
                .endDate("2023-12-12T09:00")
                .linkmeet("")
                .roomName("phòng 1")
                .skill("KT")
                .startDate("2023-12-10T08:00")
                .status("Created")
                .jobPostingEntity(job2)
                .userAccountEntity(reccer2)
                .build();
        interviewRepository.save(interview1);
        interviewRepository.save(interview2);

        GenerateInterviewDetail(interview1);
    }


    public void GenerateCV(UserAccountEntity candidate, JobPostingEntity job1) {
        var cv = CVEntity.builder()
                .dateApply("2023-12-09")
                .url("https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1702126839381_cv1.pdf?alt=media")
                .jobPostingEntity(job1)
                .userAccountEntity(candidate)
                .build();
        cvRepository.save(cv);
    }


    public void GenerateSkillPosition() {
        var skill1 = SkillEntity.builder()
                .createdBy("admin@gmail.com")
                .isDeleted(false)
                .skillName("ReactJS")
                .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .build();
        var skill2 = SkillEntity.builder()
                .createdBy("admin@gmail.com")
                .isDeleted(false)
                .skillName("Java Springboot")
                .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .build();
        skillRepository.save(skill1);
        skillRepository.save(skill2);
        var position1 = PositionEntity.builder()
                .createdBy("admin@gmail.com")
                .isDeleted(false)
                .positionName("Intern")
                .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .build();
        var position2 = PositionEntity.builder()
                .createdBy("admin@gmail.com")
                .isDeleted(false)
                .positionName("Fresher")
                .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .build();
        var position3 = PositionEntity.builder()
                .createdBy("admin@gmail.com")
                .isDeleted(false)
                .positionName("Middle")
                .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .build();
        positionRepository.save(position1);
        positionRepository.save(position2);
        positionRepository.save(position3);


    }

    public void GenerateQuestions() {
        List<QuestionEntity> questions = new ArrayList<>();
        questions.add(QuestionEntity.builder()
                .question("Tại sao ReactJS được ưa chuộng trong phát triển web?")
                .answer("ReactJS cung cấp hiệu suất cao, linh hoạt và dễ bảo trì với Virtual DOM, JSX và mô hình Component.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Lifecycle của React Component có những phương thức nào và ý nghĩa của chúng là gì?")
                .answer("Ví dụ như componentDidMount, componentDidUpdate, và componentWillUnmount, mỗi phương thức có vai trò và mục đích khác nhau trong quá trình lifecycle của một Component.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Spring Boot là gì và tại sao nó được ưa chuộng trong phát triển ứng dụng Java?")
                .answer("Spring Boot là một framework giúp tạo và triển khai ứng dụng Java dễ dàng và nhanh chóng với cấu hình mặc định. Nó giảm độ phức tạp khi phát triển ứng dụng Java.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Giải thích Dependency Injection trong Spring Boot?")
                .answer("Dependency Injection là một kỹ thuật cho phép Spring cung cấp các đối tượng mà một đối tượng cần để thực hiện chức năng của nó. Nó giúp giảm sự phụ thuộc giữa các lớp trong ứng dụng.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Điểm mạnh của ngôn ngữ lập trình Python là gì?")
                .answer("Python có cú pháp đơn giản, đa năng và mạnh mẽ với nhiều thư viện hỗ trợ, rất phù hợp cho các ứng dụng web, khoa học dữ liệu và AI.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Có những cách nào để định nghĩa hàm trong Python?")
                .answer("Hàm có thể được định nghĩa bằng từ khóa 'def' và có thể chứa các đối số và câu lệnh bên trong.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Python decorators là gì và cách chúng hoạt động?")
                .answer("Decorators là một cú pháp cho phép thay đổi hoặc mở rộng hành vi của hàm hoặc lớp trong Python. Chúng thường được sử dụng để thực hiện các thay đổi trước và sau khi gọi hàm.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Giải thích ý nghĩa của các chế độ mở file trong Python?")
                .answer("Có ba chế độ mở file chính trong Python: 'r' (đọc), 'w' (ghi - xóa nếu file đã tồn tại), 'a' (ghi - giữ nguyên nếu file đã tồn tại).")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Làm thế nào để xử lý exceptions (ngoại lệ) trong Python?")
                .answer("Exceptions trong Python có thể được xử lý bằng cú pháp 'try', 'except', 'finally'. Các lệnh trong khối 'try' được thực thi và nếu có lỗi, nó sẽ được xử lý trong khối 'except'.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Có sự khác biệt gì giữa List và Tuple trong Python?")
                .answer("List và Tuple là hai kiểu dữ liệu lưu trữ nhiều giá trị khác nhau. Một điểm khác biệt chính là List có thể thay đổi giá trị, trong khi Tuple là không thể thay đổi (immutable).")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.TechSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Bạn có thể mô tả về một tình huống khi bạn phải làm việc trong một nhóm có ý kiến trái chiều?")
                .answer("Một câu trả lời có thể bao gồm việc nêu ra tình huống cụ thể, cách giải quyết xung đột và cách học hỏi từ những ý kiến khác nhau.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.SoftSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Làm thế nào để bạn quản lý thời gian hiệu quả?")
                .answer("Câu trả lời có thể liệt kê các phương pháp quản lý thời gian như tạo lịch trình, ưu tiên công việc, và sử dụng công cụ hỗ trợ.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.SoftSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Làm thế nào để bạn giải quyết một vấn đề phức tạp?")
                .answer("Câu trả lời có thể bao gồm việc phân tích vấn đề, tìm kiếm thông tin, tư duy sáng tạo và thử nghiệm các giải pháp khác nhau.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.SoftSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Làm thế nào bạn xử lý áp lực và căng thẳng trong công việc?")
                .answer("Câu trả lời có thể bao gồm việc tìm kiếm cách thức giảm bớt áp lực, quản lý căng thẳng thông qua việc tập thể dục, thực hành mindfulness hoặc quản lý công việc một cách hiệu quả hơn.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.SoftSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Bạn có thể mô tả về một lần bạn phải đưa ra quyết định quan trọng trong công việc?")
                .answer("Câu trả lời có thể bao gồm mô tả tình huống cụ thể, cách bạn thu thập thông tin, xác định các lựa chọn và quyết định của bạn.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.SoftSkill)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("What are some effective ways to improve English language proficiency?")
                .answer("Answers may include practicing regularly, reading books, watching English movies, and engaging in conversations with native speakers.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.Language)
                .isDeleted(false)
                .build());
        questions.add(QuestionEntity.builder()
                .question("Can you discuss the importance of English in the global business environment?")
                .answer("Responses might include how English facilitates international communication, enhances job opportunities, and enables access to global resources.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.Language)
                .isDeleted(false)
                .build());

        questions.add(QuestionEntity.builder()
                .question("How would you describe your experience with English language learning?")
                .answer("This question allows the interviewee to share their personal journey, challenges faced, and strategies used to improve their English skills.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.Language)
                .isDeleted(false)
                .build());

        questions.add(QuestionEntity.builder()
                .question("Can you explain the importance of effective communication in English within a professional setting?")
                .answer("Answers might touch on clear communication, avoiding misunderstandings, and building rapport with colleagues or clients.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.Language)
                .isDeleted(false)
                .build());

        questions.add(QuestionEntity.builder()
                .question("What methods do you use to expand your vocabulary in English?")
                .answer("Responses could include reading diverse materials, using vocabulary apps, and practicing new words in conversations or writing.")
                .createTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                .createdBy("interviewer1@gmail.com")
                .field(FieldEnum.Language)
                .isDeleted(false)
                .build());

        for (QuestionEntity question : questions) {
            questionRepository.save(question);
        }
    }

    public void GenerateBlackList(UserAccountEntity user)  {
        var blacklist = BlacklistEntity.builder()
                .dateBlacklist(LocalDateTime.now())
                .description("hacker")
                .userAccountEntity(user)
                .build();
        blackListRepository.save(blacklist);
    }


    public void GenerateInterviewDetail(InterviewEntity interview) {
        var detail = InterviewDetailEntity.builder()
                .averageScore(0F)
                .candidateId(6L)
                .comment("")
                .date("2023-12-10")
                .description("no description")
                .englishQuestions("")
                .softSkillQuestions("")
                .interviewer("")
                .technicalQuestions("")
                .status("Chưa phỏng vấn")
                .interviewerEmail("")
                .time("08h00 to 09h00")
                .interview(interview)
                .build();
        interviewDetailRepository.save(detail);
    }




}

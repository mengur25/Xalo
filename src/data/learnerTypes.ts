import { LearningType } from "@/types";

export interface LearnerProfile {
    name: LearningType;
    code: string; // e.g., HHH
    description: string;
    image: string;
    ingredients: {
        knowledge: string;
        skills: string;
        behavior: string;
    };
    sideEffects: string;
    prescription: string;
    subtitle?: string;
    combo?: string;
}

export const learnerProfiles: Record<LearningType, LearnerProfile> = {
    'Multi-vitamins': {
        name: 'Multi-vitamins',
        code: 'HHH',
        description: 'Bạn là kiểu người học có sự phát triển về cả ba khía cạnh được đánh giá – vững vàng về kiến thức, linh hoạt trong kỹ năng và tích cực về thái độ. Bạn nắm chắc nền tảng ngôn ngữ, biết cách áp dụng vào bài thi, và có tinh thần học tập cao. Nhờ vậy, bạn có khả năng tiến xa và đạt mục tiêu cao nếu giữ được nhịp độ và sự tỉnh táo trong quá trình ôn luyện.\nỞ bạn toát lên một phong thái học thuật rõ rệt – sự nghiêm túc, tư duy phân tích, khả năng tổ chức việc học và định hướng dài hạn. Có thể bạn từng đảm nhận các vai trò như lớp trưởng, lớp phó học tập hoặc tham gia tích cực vào những hoạt động học thuật trong trường/lớp/ nơi công tác của bản thân.',
        image: 'Multi-vitamins.png',
        subtitle: '#AllRounder #ExamWarrior #HighAchiever',
        combo: '- Bạn Đồng Hành "Chữa Lành": Gummy Bear\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',
        ingredients: {
            knowledge:
                'Bạn có nền tảng ngôn ngữ vững chắc – vốn từ, ngữ pháp và khả năng hiểu cấu trúc câu đủ để xử lý nhiều dạng bài phức tạp. Bạn không chỉ học từ sách giáo khoa mà còn mở rộng kiến thức thông qua tài liệu học thuật, video, podcast, và các cuộc hội thoại thực tế.',
            skills:
                'Bạn hiểu rõ cấu trúc đề thi, làm chủ thời gian và có chiến thuật riêng khi làm bài. Khả năng nhận diện và xử lý “bẫy đề” linh hoạt giúp bạn có lợi thế lớn trong phòng thi.',
            behavior:
                'Bạn nghiêm túc với việc học, và có xu hướng duy trì kỷ luật tốt. Bạn xem việc học như một hành trình cần thiết để phát triển bản thân. Dù không phải lúc nào cũng tràn đầy năng lượng, bạn có khả năng tự tạo động lực và duy trì mục tiêu lâu dài.'
        },
        sideEffects:
            'Đôi khi, liều lượng quá cao có thể dẫn đến những phản ứng không mong muốn.\n- Áp lực từ bản thân: Bạn có thể tự đặt kỳ vọng quá cao và dễ bị áp lực bởi mục tiêu do chính mình đặt ra. Điều này đôi khi có thể khiến bạn kiệt sức hoặc thất vọng nếu mọi thứ không diễn ra đúng như mong đợi.\n- “Bẫy ổn định”: Đôi khi, bạn có thể cảm thấy mình đã đủ tốt và mất đi động lực để cải thiện bản thân hơn nữa. Việc dừng cố gắng hoặc giảm nỗ lực có thể khiến bạn bỏ lỡ những cơ hội phát triển vượt bậc.',
        prescription:
            'Hãy tiếp tục duy trì thói quen tốt nhưng đừng quên cân bằng giữa học tập và nghỉ ngơi. Thử thách bản thân với các dạng đề mới để tránh cảm giác “dậm chân tại chỗ”. Khi học, hãy giữ tâm lý nhẹ nhàng thay vì quá áp lực vào kết quả. Bền vững và thoải mái sẽ là chìa khóa để bạn tiến xa hơn.'
    },
    'Gummy Bear': {
        name: 'Gummy Bear',
        code: 'LLL',
        description: 'Bạn thuộc nhóm người học cần sự hỗ trợ ở cả ba khía cạnh: kiến thức nền, kỹ năng làm bài và thái độ học tập. Ở một số trường hợp, bạn đang ở những bước đầu tiên trong hành trình học tiếng Anh – mọi thứ còn mới mẻ, đôi lúc mơ hồ, nhưng điều quan trọng là bạn đã bắt đầu. Ở những trường hợp khác, bạn đã học một thời gian, từng thử nhiều cách, nhưng vẫn chưa thể nhìn thấy kết quả rõ rệt. Việc này dễ khiến bạn dễ hoang mang, nghi ngờ chính mình hoặc mất phương hướng. Lúc này, bạn cần gỡ rối lại nền tảng cũ, được định hướng lại một cụ thể và phù hợp với nhịp học của bạn.',
        image: 'Gummy Bear.png',
        subtitle: '#FishOutOfWater #FreshOnTheTrack  #HandleWithCare',
        combo: '- Bạn Đồng Hành "Chữa Lành": Multi-vitamins\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',

        ingredients: {
            knowledge:
                'Bạn đang trong giai đoạn cần củng cố lại nền tảng – dù là mới bắt đầu học, hay đã học một thời gian nhưng chưa thực sự nắm vững những kiến thức cốt lõi. Điều bạn cần lúc này là quay về “gốc rễ”: tập trung vào từ vựng cơ bản, các cấu trúc câu rõ ràng và ngữ pháp nền để tạo một bệ phóng chắc chắn cho các kỹ năng phức tạp hơn sau này.',
            skills:
                'Bạn chưa quen với cấu trúc đề IELTS và cách xử lý các dạng câu hỏi, còn thấy bài thi khá xa lạ và khó tiếp cận, hoặc đã từng ôn luyện một thời gian nhưng vẫn thấy mình loay hoay. Điều cần thiết là xây lại kỹ năng từ đầu – học cách đọc đề, phân tích yêu cầu, kiểm soát thời gian và phản xạ với từng dạng bài – với sự hướng dẫn cụ thể, chậm rãi và có hệ thống.',
            behavior:
                'Bạn có thể gặp khó khăn trong việc duy trì thói quen học tập đều đặn và thiếu động lực học lâu dài. Điều này có thể đến từ việc trước đây chưa có nhu cầu học tập có tổ chức, hoặc cảm giác thiếu tự tin vào khả năng của mình. Bên cạnh việc học có hệ thống, những trải nghiệm tích cực với ngôn ngữ – như nghe podcast nhẹ nhàng, xem phim yêu thích không phụ đề, hay đơn giản là hiểu được một câu quote tiếng Anh – sẽ là những “liều vitamin cảm xúc” giúp bạn giữ lửa trên hành trình học.'
        },
        sideEffects:
            'Mỗi viên gummy đều dễ tan nếu không bảo quản đúng cách.\n- Cần sự hỗ trợ: Giống như kẹo gummy – càng mềm mại càng cần được nâng niu – bạn không cần phải cứng rắn từ đầu. Bạn chỉ cần một môi trường an toàn với những sự hỗ trợ đúng lúc để bạn không sợ sai.\n- Nhịp độ chậm rãi: Bạn cần kiên nhẫn, vì tiến bộ có thể diễn ra chậm và bạn sẽ cần thời gian để củng cố các yếu tố cơ bản trước khi tiến tới mục tiêu lớn hơn. Đừng so sánh mình với người khác, hãy tập trung vào sự phát triển của bản thân. Thay vì đặt kỳ vọng quá lớn trong thời gian ngắn, bạn nên hướng tới những bước tiến nhỏ nhưng chắc chắn – và từng cột mốc đó sẽ là động lực để bạn giữ vững nhịp học của riêng mình.',
        prescription:
            'Bạn nên bắt đầu bằng việc xây lại nền tảng từ từ vựng và ngữ pháp căn bản. Hãy chia mục tiêu lớn thành các mục tiêu nhỏ để dễ hoàn thành hơn. Tạo một lịch học cố định giúp bạn duy trì thói quen ổn định và bền vững hơn. Ngoài ra, hãy tìm người hướng dẫn để theo sát và giúp bạn đi đúng hướng.'
    },
    'Caffeine Tablet': {
        name: 'Caffeine Tablet',
        code: 'HLH',
        description: 'Bạn thuộc nhóm người học có kiến thức nền vững và tinh thần học tập cao, nhưng kỹ năng làm bài thi vẫn đang trong quá trình hình thành hoặc đã bão hoà. Giống như một viên caffeine cô đặc – bạn có nguồn năng lượng dồi dào, nội lực mạnh, và sẵn sàng bứt phá.. Nếu tìm được phương pháp học phù hợp và luyện tập đủ "liều", bạn hoàn toàn có thể tạo ra cú bật đáng kinh ngạc.',
        image: 'Caffeine Tablet.png',
        subtitle: '#QuietGenius #RisingStar  #ThirstyMind',
        combo: '- Bạn Đồng Hành "Chữa Lành": Sugar Pill\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',
        ingredients: {
            knowledge:
                'Bạn có một nền tảng ngôn ngữ vững vàng – vốn từ rộng, ngữ pháp chắc và khả năng hiểu câu phức khá tốt. Kiến thức này không chỉ đến từ sách vở, mà còn từ những trải nghiệm sống: đọc, nghe, quan sát và suy ngẫm. Nó là loại kiến thức “sống”, có chiều sâu, không chỉ để thi mà còn để dùng.',
            skills:
                'Đây là khâu bạn chưa thực sự kiểm soát tốt – bạn có thể vẫn còn lúng túng với một số dạng bài đặc thù, dễ bị ảnh hưởng bởi áp lực thời gian hoặc chưa áp dụng được các chiến thuật làm bài một cách hiệu quả. Khi gặp bài thi, bạn có thể hiểu nội dung nhưng chưa biết cách xử lý nhanh, chính xác và có chiến lược, dẫn đến kết quả chưa ổn định.\nTuy nhiên, cũng có trường hợp ngược lại: bạn đã vượt qua giai đoạn cần dựa vào chiến thuật. Có thể bạn đã thi thử hoặc thi thật với kết quả tốt và giờ đây lựa chọn cách tiếp cận bài thi một cách tự nhiên hơn. Thay vì phụ thuộc vào mẹo hay công thức, bạn sử dụng khả năng hiểu đề, tư duy linh hoạt và phản xạ cá nhân để xử lý câu hỏi – giống như một cơ chế được kích hoạt tự động sau quá trình luyện tập đủ lâu.',
            behavior:
                'Bạn học với mong muốn rất rõ ràng: mong muốn hiểu, mong muốn tiến bộ. Bạn chủ động, nghiêm túc và có mong muốn cải thiện thật sự. Tuy nhiên, việc học của bạn đôi khi lại thiếu kiểm chứng từ thực tế thi cử. Bạn có thể học chăm, học chắc, nhưng lại chưa tiếp cận bài thi theo hướng có chiến lược. Việc mơ hồ về phương pháp học, ít phân tích kỹ năng hoặc chưa có cơ hội va chạm với tiêu chí chấm điểm cụ thể có thể khiến năng lực thật của bạn chưa được thể hiện trọn vẹn.'
        },
        sideEffects:
            'Caffein không thể vực dậy một cơ thể mất ngủ và thiếu dưỡng chất. Động lực học tập cao sẽ chỉ phát huy giá trị khi được dẫn dắt bởi một lộ trình rõ ràng và chiến lược ôn luyện phù hợp.\n- Mất điểm oan: Dù kiến thức của bạn thừa sức để trả lời đúng, việc thiếu hoặc không chú trọng kỹ năng làm bài thi có thể khiến bạn mất điểm một cách oan uổng, không phản ánh đúng năng lực thực tế. Điều này đặc biệt đúng với hai kỹ năng có chiến lược đặc thù như Writing và Speaking.\n- "Lạc lối" không định hướng: Bạn dễ bị mất phương hướng nếu không có một kế hoạch học tập cụ thể, rõ ràng, hoặc thiếu sự dẫn dắt từ giáo viên, chuyên gia.',
        prescription:
            'Bạn nên ưu tiên rèn kỹ năng làm bài bằng cách luyện đề theo từng dạng. Tập quản lý thời gian và rèn phản xạ nhanh để giảm áp lực khi thi. Hãy kết hợp luyện thi với các chiến thuật thông minh như loại trừ, đọc lướt, phân tích bẫy. Khi kỹ năng ổn định, điểm số của bạn sẽ tăng mạnh tương ứng với năng lực thật.'
    },
    'Vitamin C': {
        name: 'Vitamin C',
        code: 'LHH',
        description: 'Bạn thuộc nhóm người học có kỹ năng làm bài thi và tinh thần học tập nổi bật. Trong quá trình ôn luyện, bạn tập trung vào những điểm chiến lược bài thi và kế hoạch học tập rõ ràng. Tuy nhiên, bạn đang gặp một chút rào cản về kiến thức học thuật hoặc/và kiến thức xã hội nên chưa thể duy trì hiệu quả ổn định và vươn tới các mốc điểm cao hơn.',
        image: 'Vitamin C.png',
        subtitle: '#SkimScanStrike #TacticalThinker #GrindWithGrace',
        combo: '- Bạn Đồng Hành "Chữa Lành": Omega 3\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',
        ingredients: {
            knowledge:
                'Bạn đang có lợi thế về kỹ năng, nhưng nền tảng ngôn ngữ vẫn còn nhiều khoảng trống – như ngữ pháp nâng cao, từ vựng học thuật hoặc cấu trúc câu phức tạp. Đôi lúc bạn tập trung quá nhiều vào việc luyện các dạng bài, dạng đề mà quên mất tầm quan trọng của việc củng cố vốn từ vựng và ngữ pháp nền. Điều này khiến bạn có thể trả lời đúng, nhưng lại không giải thích rõ được lý do phía sau.\nỞ một trường hợp khác, bạn đã có cơ hội tiếp xúc nhiều với các bài thi tiếng Anh trong quá trình học phổ thông nên phần nào hiểu rõ hơn về dạng đề và cách làm bài nhưng vẫn còn những lỗ hổng nhất định về nền tảng kiến thức. Điều này nghĩa là kỹ năng làm bài thi không hẳn đã vững chắc, nhưng vẫn đang ở mức "nhỉnh hơn" so với phần nền tảng kiến thức.',
            skills:
                'Đây là vũ khí chủ lực của bạn. Bạn hiểu/sử dụng được các kỹ thuật tìm từ khóa, loại trừ đáp án, phân bổ thời gian và biết dùng chiến lược nào để đạt được điểm số cao nhất có thể. Kỹ năng này giúp bạn vượt qua nhiều thử thách trong bài thi – thậm chí là những dạng đề khó.',
            behavior:
                'Bạn là người hiểu rõ giá trị của việc học – không chỉ vì điểm số, mà vì bạn biết tiếng Anh là chìa khoá để mở ra nhiều cơ hội. Dù cuộc sống có bận rộn, bạn vẫn nhận thức được tầm quan trọng của việc học IELTS/tiếng Anh và sẽ sẵn sàng sắp xếp thời gian khi cần học.\nBạn có mục tiêu học tập rõ ràng, và cố gắng duy trì kỉ luật để đạt được nó. Điều này có thể xuất phát từ việc bạn nhận thức được tầm quan trọng của Tiếng Anh và cho rằng đây là chìa khoá để mở ra nhiều cơ hội trong cuộc sống. Bạn có xu hướng chọn những phương pháp học giúp tối ưu hiệu quả và nâng cao thành tích. Tư duy này khiến bạn trở thành người học chủ động, kiên trì và có chiến lược.'
        },
        sideEffects:
            'Nếu chỉ dựa vào Vitamin C mà không có các dưỡng chất khác, \'sức đề kháng\' của bạn sẽ không bền vững.\n- "Hệ miễn dịch" yếu: Bạn dễ bị “knock-out” khi gặp đề bài theo xu hướng thi mới, những bài tập yêu cầu tư duy sâu, lập luận rõ hoặc ứng dụng kiến thức vào tình huống mới.\n- "Chững lại" trên đường đua: Bạn thường đạt kết quả khá tốt trong thời gian đầu nhờ vào kỹ năng chiến thuật của mình. Tuy nhiên, bạn sẽ dễ chững lại ở một mức điểm nhất định và khó đạt được kết quả vượt trội, thậm chí là thụt lùi khi độ khó của đề thi tăng lên.',
        prescription:
            'Bạn cần ưu tiên củng cố nền tảng kiến thức thông qua việc học sâu – học chắc. Hãy hệ thống hóa lại ngữ pháp, mở rộng từ vựng theo chủ đề và luyện tập có phương pháp. Khi kiến thức nền mạnh lên, kỹ năng của bạn sẽ càng phát huy hiệu quả. Kết hợp giữa học kiến thức và luyện mẹo sẽ giúp bạn tiến xa hơn.'
    },
    'Cough Syrup': {
        name: 'Cough Syrup',
        code: 'HHL',
        description: 'Bạn thuộc nhóm người học có nền tảng kiến thức vững và kỹ năng làm bài thi tốt – thậm chí có thể từng đạt thành tích ấn tượng trong kỳ thi IELTS. Tuy nhiên, thay vì duy trì việc học một cách đều đặn, bạn thường chỉ thực sự vào guồng khi có mục tiêu rõ ràng, áp lực cận kề hoặc được ai đó thúc đẩy. Giống như lọ thuốc ho chỉ được lấy ra khi cần, bạn học hiệu quả nhất khi bị đặt vào tình huống buộc phải hành động.\nỞ một số trường hợp, bạn đã làm chủ bài thi đến mức không còn thấy nó đủ hứng thú hoặc nằm trong ưu tiên của bạn nữa. Không phải vì bạn dừng lại hẳn – mà đơn giản là bạn đang chờ một lý do đủ lớn để bật chế độ nghiêm túc trở lại.',
        image: 'Cough Syrup.png',
        subtitle: '#Reluctant Achiever #TacticOverPanic #TooCoolToCommit',
        combo: '- Bạn Đồng Hành "Chữa Lành": Bee Pollen\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',
        ingredients: {
            knowledge:
                'Bạn sở hữu một nền tảng ngôn ngữ khá vững, được hình thành qua quá trình học tập trước đây – có thể là từ trường lớp, luyện thi, hoặc tiếp xúc thường xuyên với tiếng Anh trong môi trường học thuật và giải trí. Dù không hẳn là người liên tục đào sâu kiến thức hay ôn luyện bài bản, bạn đã từng đạt được mức độ đủ tốt để xử lý các dạng bài thi phổ biến. Tuy nhiên, nếu không được “kích hoạt” đúng lúc, nền tảng này có thể dần mai một – không phải vì yếu, mà vì không được duy trì đúng cách.',
            skills:
                'Bạn có kỹ năng làm bài ở mức khá đến tốt – xử lý các dạng câu hỏi quen thuộc như Matching, True/False, Multiple Choice một cách hiệu quả. Nhờ từng luyện tập đủ nhiều, bạn hiểu cấu trúc đề và có những chiến lược riêng để xử lý nhanh gọn. Tuy nhiên, khả năng duy trì sự tập trung, xử lý các dạng bài thách thức, hoặc làm bài dưới áp lực thời gian vẫn là điều bạn cần tiếp tục rèn luyện. Một khi đã lâu không luyện đề, kỹ năng có thể “lụt nghề” nhẹ, ảnh hưởng đến kết quả.',
            behavior:
                'Bạn biết học là quan trọng, nhưng khó duy trì hứng thú nếu không có mục tiêu ngắn hạn rõ ràng. Hoặc trong một số trường hợp khác, việc học của bạn dễ bị chi phối bởi tâm trạng, công việc khác, hoặc đơn giản là… thiếu cảm hứng. Có thời điểm, bạn học rất chăm chỉ – nhưng cũng có lúc bỏ bê hoàn toàn.'
        },
        sideEffects:
            'Không ho không uống: Khi không có áp lực hay kỳ thi gần kề, bạn dễ mất động lực học.\n- Thiếu ổn định: Dù kỹ năng làm bài thi của bạn đã tốt, bạn vẫn cần duy trì phong độ ổn định và khả năng xử lý áp lực thời gian để không bị bối rối trước những tình huống bất ngờ.\n- "Mất lửa": Nếu học chỉ vì áp lực bên ngoài, bạn sẽ dễ cảm thấy học là gánh nặng. Một kế hoạch cụ thể, cộng với những mục tiêu cá nhân ý nghĩa, sẽ giúp bạn học chủ động hơn – và lâu dài hơn.',
        prescription:
            'Bạn cần xây dựng một lịch học đều đặn và dễ thực hiện, không quá tải để tránh bỏ cuộc. Hãy kết hợp học tập với những hoạt động tạo hứng thú như học qua video, luyện test ngắn. Khi duy trì được thói quen, bạn sẽ phát huy được toàn bộ năng lực sẵn có.'
    },
    'Omega 3': {
        name: 'Omega 3',
        code: 'HLL',
        description: 'Bạn là kiểu người học có nền tảng kiến thức tốt,– giống như một viên Omega 3 chứa đầy dưỡng chất cho não bộ. Tuy nhiên, dù có hiểu biết và khả năng lý luận, bạn vẫn chưa biến được kiến thức thành kỹ năng làm bài chắc tay, đặc biệt là trong bối cảnh thi thật với áp lực thời gian và yêu cầu tốc độ cao. Việc học của bạn có thể chưa đủ đều đặn, chưa gắn với mục tiêu cụ thể, hoặc đơn giản là chưa tìm được lý do đủ lớn để duy trì lâu dài.',
        image: 'Omega 3.png',
        subtitle: '#WalkingEncyclopedia #ForgottenVirtuoso #ActivateToDominate',
        combo: '- Bạn Đồng Hành "Chữa Lành": Vitamin C\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',
        ingredients: {
            knowledge:
                'Bạn có nền tảng ngôn ngữ khá vững – từ vựng học thuật, cấu trúc ngữ pháp, khả năng phân tích ngữ nghĩa đều ở mức tốt. Với bạn, việc hiểu lý thuyết không khó, Tuy nhiên, kiến thức đó chưa được vận dụng trơn tru vào bài thi. Bạn có thể nhìn ra vấn đề, nhưng vẫn loay hoay khi phải chuyển chúng thành kỹ năng làm bài hoặc phản xạ thực chiến.',
            skills:
                'Bạn chưa có thói quen phân tích dạng bài, canh thời gian hợp lý hay phản xạ đủ nhanh với các câu hỏi IELTS đặc thù.. Khi làm bài, bạn dễ bị cuốn vào chi tiết hoặc bị “đứng hình” nếu gặp dạng bài không quen.',
            behavior:
                'Việc học Tiếng Anh đôi khi không phải là ưu tiên hàng đầu của bạn. Bạn có thể thiếu sự nhất quán trong thói quen học tập và đôi khi dễ bị phân tâm bởi những yếu tố bên ngoài. Bạn chưa thực sự chủ động tìm kiếm những kiến thức nâng cao hoặc các chiến lược làm bài thi thực tế.'
        },
        sideEffects:
            'Nếu không chuyển hóa đúng cách, dưỡng chất sẽ bị đào thải mà không mang lại hiệu quả.\n- Mất cơ hội: Bạn đã có thứ mà nhiều người còn thiếu – đó là nền tảng kiến thức vững. Nhưng nếu không chuyển hóa thành kỹ năng, bạn sẽ bỏ lỡ những cơ hội đạt mức điểm mong muốn. .\n- "Giậm chân tại chỗ": Thói quen học tập không ổn định là một trở ngại lớn. Bạn cần tập trung xây dựng lịch trình học cụ thể và giữ động lực học tập, nếu không bạn sẽ khó tiến bộ.',
        prescription:
            'Bạn cần tập trung rèn kỹ năng làm bài thi và hình thành thói quen học tập ổn định. Hãy luyện đề theo từng dạng và đặt mục tiêu nhỏ mỗi ngày. Khi kỹ năng và thái độ được cải thiện, kiến thức của bạn sẽ phát huy tối đa hiệu quả.'

    },
    'Sugar Pill': {
        name: 'Sugar Pill',
        code: 'LHL',
        description: 'Bạn biết cách tận dụng nguồn lực, sắp xếp chiến thuật, và xử lý đề thi một cách hiệu quả. Tuy nhiên, giống như một viên kẹo ngọt – thứ mang lại tác dụng đôi khi nhờ niềm tin hơn là hoạt chất thật sự – cách học của bạn có thể chưa chạm đến chiều sâu. Khi thử thách tăng lên, bạn sẽ cần một hướng đi bền hơn để phát triển tiếp.',
        image: 'Sugar Pill.png',
        subtitle: '#SweetAndSnappy #TheInstantLearner #CatchMeStudying',
        combo: '- Bạn Đồng Hành "Chữa Lành": Caffein Tablet\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',
        ingredients: {
            knowledge:
                'Bạn đã tiếp cận nhiều mẹo học và chiến thuật thông minh, giúp bạn đạt được kết quả tốt trong các dạng bài quen thuộc. Tuy nhiên, phần lớn những gì bạn biết hiện nay chủ yếu phục vụ cho việc xử lý đề thi — như đoán từ khóa, loại trừ đáp án, nhận diện bẫy — thay vì bắt nguồn từ sự hiểu sâu về ngôn ngữ. Điều này khiến kiến thức bạn nhận được có thể hiệu quả trong phòng thi, nhưng ít được chuyển hóa sang các tình huống như viết văn bản học thuật, diễn đạt ý phức tạp, hoặc giao tiếp thực tế. Nếu được củng cố thêm nền tảng – từ từ vựng học thuật, ngữ pháp chuyên sâu đến cách phát triển ý mạch lạc – bạn sẽ phát huy mạnh mẽ hơn, không chỉ thi tốt mà còn học tốt, dùng tốt.',
            skills:
                'Đây là thế mạnh rõ rệt của bạn. Bạn biết cách quan sát đề, chọn chiến lược phù hợp và thao tác nhanh – đặc biệt hiệu quả với các dạng bài trắc nghiệm, điền từ hay matching. Nếu kết hợp kỹ năng này với nền tảng ngôn ngữ sâu hơn, bạn sẽ chuyển từ “làm được đề” sang “làm chủ bài thi”.',
            behavior:
                'Bạn có xu hướng học theo mục tiêu cụ thể – thi cử, deadline, hoặc cảm hứng bất chợt. Đây không phải điểm yếu, mà là điểm xuất phát. Điều bạn cần lúc này không chỉ là kỷ luật, mà là cảm hứng – một lý do đủ mạnh để thấy rằng kiến thức không chỉ giúp bạn đạt điểm cao, mà còn làm cho tiếng Anh trở thành công cụ thật sự hữu ích: để giao tiếp, học hỏi, và mở rộng cơ hội trong cuộc sống. Khi thấy được giá trị đó, việc học sẽ trở nên tự nhiên và bền vững hơn rất nhiều.'
        },
        sideEffects:
            'Hiệu quả tức thì có thể khiến bạn hài lòng… nhưng chưa thực sự chữa được những vấn đề ẩn sâu bên trong.\n- Hiệu ứng “đủ rồi”: Khi bạn đạt kết quả tốt chỉ với một chút ôn tập, bạn dễ nghĩ rằng mình “ổn rồi”. Nhưng điều này có thể khiến bạn chậm lại trên hành trình nâng band hoặc ứng dụng tiếng Anh một cách chuyên sâu hơn.\n- Khó “tăng đô” nếu thiếu nền tảng: Ở mức mục tiêu cao hơn (7.5+), đề thi đòi hỏi vốn từ học thuật, lập luận logic và tư duy ngôn ngữ rõ ràng – những thứ mà mẹo hay phản xạ nhanh khó đảm đương một mình.\n- Dễ mất hứng nếu không có kết quả nhanh: Bạn là người dễ hứng khởi khi thấy kết quả ngay lập tức, nhưng cũng dễ nản nếu tiến bộ chậm lại. Điều này đòi hỏi bạn rèn thêm tính kiên trì và học cách thấy giá trị của tiến bộ bền vững – kể cả khi nó không quá “lấp lánh” ngay từ đầu.',
        prescription:
            'Bạn nên bắt đầu bổ sung kiến thức nền và tạo thói quen học tập tốt hơn. Kết hợp giữa kỹ năng và kiến thức mới sẽ giúp bạn ổn định kết quả. Hãy học theo lộ trình rõ ràng và kiểm tra tiến độ thường xuyên.'
    },
    'Bee Pollen': {
        name: 'Bee Pollen',
        code: 'LLH',
        description: 'Bạn là người học có đam mê lớn với tiếng Anh và văn hóa US-UK, dù chưa có nền tảng vững vàng hay kỹ năng làm bài thi sắc sảo. Điều khiến bạn khác biệt là sự nghiêm túc và nỗ lực bền bỉ. Bạn học vì một mục tiêu rõ ràng – có thể là ước mơ du học, mong muốn phát triển bản thân, hoặc đơn giản là tình yêu với ngôn ngữ. Tuy nhiên, khi đam mê không đi cùng phương pháp rõ ràng và kiến thức căn bản, bạn dễ cảm thấy mình đang cố gắng rất nhiều nhưng kết quả vẫn chưa như kỳ vọng.',
        image: 'Bee Pollen.png',
        subtitle: '#PassionateScholar #ConfusedButCommitted #BeeLieveInMe',
        combo: '- Bạn Đồng Hành "Chữa Lành": Cough Syrup\n- Bạn Đồng Hành "Full Công Lực": Multi-vitamins',

        ingredients: {
            knowledge:
                'Bạn có thể “bắt sóng” được ngôn ngữ và văn hoá, nhưng kiến thức chưa được hệ thống hoá thành một nền tảng vững chắc. Vốn từ vựng và ngữ pháp còn hạn chế, khiến bạn gặp khó khăn khi đối mặt với các dạng câu hỏi trong bài thi.',
            skills:
                'Bạn chưa tập trung phát triển kỹ năng làm bài thi, thiếu chiến thuật hiệu quả trong việc giải quyết các câu hỏi và quản lý thời gian. Điều này khiến bạn cảm thấy bối rối trong môi trường thi cử, dù bạn có sự yêu thích và động lực học rất lớn.',
            behavior:
                'Bạn có tinh thần học hỏi và mong muốn cải thiện nghiêm túc Bạn có sự kiên trì và đam mê với ngôn ngữ , không ngại thử sức. Tuy nhiên, bạn hơi thiếu sự tổ chức và đang tìm kiếm phương pháp học hiệu quả và phù hợp.'
        },
        sideEffects:
            'Bee pollen không thể thay thế một lịch trình ăn uống khoa học. Hành trình học ngôn ngữ cũng cần được xây dựng một cách bài bản và hợp lý.\n- "Cháy" nhưng không hiệu quả: Phải tập trung vào việc phát triển các kỹ năng làm bài thi và chiến thuật quản lý thời gian. Đam mê mà không có kỹ năng sẽ khó "chạm" đến mục tiêu.\n- Thiếu định hướng: Cần có kế hoạch học tập rõ ràng để xây dựng nền tảng vững chắc và biến đam mê thành kết quả bền vững.',
        prescription:
            'Bạn nên bắt đầu từ việc học lại căn bản với lộ trình rõ ràng. Hãy xây dựng kiến thức từ từ và luyện kỹ năng theo từng dạng nhỏ. Khi bạn có nền móng vững, thái độ tích cực sẽ giúp bạn tiến rất nhanh. Đây là nhóm có tiềm năng phát triển mạnh nếu có phương pháp đúng.'
    }
};